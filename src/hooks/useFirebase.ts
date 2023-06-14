import {
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
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
  useAuth,
} from '@/contexts'
import { firebaseApp } from '@/services'

export type FirebaseDataSnapshot<T> = { [key: string]: T }

export const useFirebaseAuth = () => {
  const auth = getAuth()

  const signInWithGoogle = () => {
    const authProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, authProvider)
  }

  const reauthenticate = async () => {
    if (!auth.currentUser) return
    const authProvider = new GoogleAuthProvider()
    const response = await reauthenticateWithPopup(
      auth.currentUser,
      authProvider
    )
    return response.user
  }

  const firebaseSignOut = () => {
    return signOut(auth)
  }

  const onAuthChange = (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback)
  }

  const updateCurrentUser = async (name: string) => {
    if (!auth.currentUser) return
    const data = { displayName: name }
    await updateProfile(auth.currentUser, data)
  }

  const deleteCurrentAccount = async () => {
    const user = auth.currentUser
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
      return user
    }
  }

  return {
    signInWithGoogle,
    firebaseSignOut,
    onAuthChange,
    updateCurrentUser,
    deleteCurrentAccount,
  }
}

export const useFirebaseDatabase = () => {
  const database = getDatabase(firebaseApp)
  const { user } = useAuth()
  const userId = user?.id

  const transactionsPath = `users/${userId}/transactions`
  const transactionsRef = ref(database, transactionsPath)

  const recurrencesPath = `users/${userId}/recurrences`
  const recurrencesRef = ref(database, recurrencesPath)

  // Transactions //

  const onTransactionsValue = (
    callback: (data: FirebaseDataSnapshot<AddTransactionModel>) => void
  ) => {
    return onValue(transactionsRef, (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddTransaction = (transaction: TransactionModel) => {
    return set(ref(database, `${transactionsPath}/${transaction.id}`), {
      ...transaction,
      userId,
    })
  }

  const remoteRemoveTransaction = (id: string) => {
    return remove(ref(database, `${transactionsPath}/${id}`))
  }

  // Recurrences //

  const onRecurrencesValue = (
    callback: (data: FirebaseDataSnapshot<RecurrentTransaction>) => void
  ) => {
    return onValue(recurrencesRef, (data) =>
      callback(data.exists() ? data.val() : {})
    )
  }

  const remoteAddRecurrence = (recurrence: RecurrentTransaction) => {
    return set(ref(database, `${recurrencesPath}/${recurrence.id}`), {
      ...recurrence,
      userId,
    })
  }

  const remoteRemoveRecurrence = (id: string) => {
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
