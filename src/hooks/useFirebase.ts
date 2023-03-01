import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
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

  const firebaseSignOut = () => {
    return signOut(auth)
  }

  const onAuthChange = (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback)
  }

  return {
    signInWithGoogle,
    firebaseSignOut,
    onAuthChange,
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
