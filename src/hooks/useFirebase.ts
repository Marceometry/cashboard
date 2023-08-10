/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'
import { FirebaseApp } from 'firebase/app'
import {
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import {
  AddTransactionModel,
  RecurrentTransaction,
  TransactionModel,
} from '@/types'

export type FirebaseDataSnapshot<T> = { [key: string]: T }

export const useFirebaseAuth = (firebaseApp: FirebaseApp | null) => {
  const signInWithGoogle = () => {
    if (!firebaseApp) return
    const auth = getAuth()
    const authProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, authProvider)
  }

  const reauthenticate = async () => {
    if (!firebaseApp) return
    const auth = getAuth()
    if (!auth?.currentUser) return
    const authProvider = new GoogleAuthProvider()
    const response = await reauthenticateWithPopup(
      auth.currentUser,
      authProvider
    )
    return response.user
  }

  const firebaseSignOut = async () => {
    if (!firebaseApp) return
    const auth = getAuth()
    await signOut(auth)
  }

  const updateCurrentUser = async (name: string) => {
    if (!firebaseApp) return
    const auth = getAuth()
    if (!auth?.currentUser) return
    const data = { displayName: name }
    await updateProfile(auth.currentUser, data)
  }

  const deleteCurrentAccount = async () => {
    if (!firebaseApp) return
    const auth = getAuth()
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

      const database = getDatabase()
      const userPath = `users/${user.uid}`
      await set(ref(database, userPath), {})
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
  firebaseApp: FirebaseApp | null,
  userId?: string
) => {
  const transactionsPath = `users/${userId}/transactions`
  const recurrencesPath = `users/${userId}/recurrences`

  // Transactions //

  const onTransactionsValue = useCallback(
    (callback: (data: FirebaseDataSnapshot<AddTransactionModel>) => void) => {
      if (!firebaseApp) return () => {}
      const database = getDatabase()
      return onValue(ref(database, transactionsPath), (data) =>
        callback(data.exists() ? data.val() : {})
      )
    },
    [firebaseApp, userId]
  )

  const remoteAddTransaction = (transaction: TransactionModel) => {
    if (!firebaseApp) return
    const database = getDatabase()
    return set(ref(database, `${transactionsPath}/${transaction.id}`), {
      ...transaction,
      userId,
    })
  }

  const remoteRemoveTransaction = (id: string) => {
    if (!firebaseApp || !id) return
    const database = getDatabase()
    return remove(ref(database, `${transactionsPath}/${id}`))
  }

  // Recurrences //

  const onRecurrencesValue = useCallback(
    (callback: (data: FirebaseDataSnapshot<RecurrentTransaction>) => void) => {
      if (!firebaseApp) return () => {}
      const database = getDatabase()
      return onValue(ref(database, recurrencesPath), (data) =>
        callback(data.exists() ? data.val() : {})
      )
    },
    [firebaseApp, userId]
  )

  const remoteAddRecurrence = (recurrence: RecurrentTransaction) => {
    if (!firebaseApp) return
    const database = getDatabase()
    return set(ref(database, `${recurrencesPath}/${recurrence.id}`), {
      ...recurrence,
      userId,
    })
  }

  const remoteRemoveRecurrence = (id: string) => {
    if (!firebaseApp) return
    const database = getDatabase()
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
