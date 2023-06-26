/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Auth,
  deleteUser,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { Database, onValue, ref, remove, set } from 'firebase/database'
import {
  AddTransactionModel,
  RecurrentTransaction,
  TransactionModel,
} from '@/types'

export type FirebaseDataSnapshot<T> = { [key: string]: T }

export const useFirebaseAuth = (
  database: Database | null,
  auth: Auth | null
) => {
  const signInWithGoogle = () => {
    if (!auth) return
    const authProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, authProvider)
  }

  const reauthenticate = async () => {
    if (!auth?.currentUser) return
    const authProvider = new GoogleAuthProvider()
    const response = await reauthenticateWithPopup(
      auth.currentUser,
      authProvider
    )
    return response.user
  }

  const firebaseSignOut = () => {
    if (auth) return signOut(auth)
  }

  const updateCurrentUser = async (name: string) => {
    if (!auth?.currentUser) return
    const data = { displayName: name }
    await updateProfile(auth.currentUser, data)
  }

  const deleteCurrentAccount = async () => {
    const user = auth?.currentUser
    if (!user) return
    try {
      await deleteUser(user)
      return user
    } catch (error: any) {
      const isAuthError = error?.message?.includes('auth/requires-recent-login')
      if (!auth.currentUser || !isAuthError) return

      const user = await reauthenticate()
      if (!user) return null
      await deleteUser(user)

      if (database) {
        const userPath = `users/${user.uid}`
        await set(ref(database, userPath), {})
      }

      return user
    }
  }

  return {
    signInWithGoogle,
    firebaseSignOut,
    updateCurrentUser,
    deleteCurrentAccount,
  }
}

export const useFirebaseDatabase = (
  database: Database | null,
  userId?: string
) => {
  const transactionsPath = `users/${userId}/transactions`
  const recurrencesPath = `users/${userId}/recurrences`

  // Transactions //

  const onTransactionsValue = (
    callback: (data: FirebaseDataSnapshot<AddTransactionModel>) => void
  ) => {
    if (!database) return () => {}
    return onValue(ref(database, transactionsPath), (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddTransaction = (transaction: TransactionModel) => {
    if (!database) return
    return set(ref(database, `${transactionsPath}/${transaction.id}`), {
      ...transaction,
      userId,
    })
  }

  const remoteRemoveTransaction = (id: string) => {
    if (!database) return
    return remove(ref(database, `${transactionsPath}/${id}`))
  }

  // Recurrences //

  const onRecurrencesValue = (
    callback: (data: FirebaseDataSnapshot<RecurrentTransaction>) => void
  ) => {
    if (!database) return () => {}
    return onValue(ref(database, recurrencesPath), (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddRecurrence = (recurrence: RecurrentTransaction) => {
    if (!database) return
    return set(ref(database, `${recurrencesPath}/${recurrence.id}`), {
      ...recurrence,
      userId,
    })
  }

  const remoteRemoveRecurrence = (id: string) => {
    if (!database) return
    return remove(ref(database, `${recurrencesPath}/${id}`))
  }

  return {
    onTransactionsValue,
    remoteAddTransaction,
    remoteRemoveTransaction,
    onRecurrencesValue,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
  }
}
