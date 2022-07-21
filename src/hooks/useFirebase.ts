import {
  getDatabase,
  ref,
  set,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
} from 'firebase/database'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { firebaseApp } from '@/services'
import { TransactionModel } from '@/contexts'

export const useFirebaseAuth = () => {
  const auth = getAuth()
  const authProvider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
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
  const transactionsRef = ref(database, 'transactions')

  const initialLoad = (callback: () => void) => {
    return onValue(transactionsRef, callback, { onlyOnce: true })
  }

  const remoteAddTransaction = (transaction: TransactionModel) => {
    return set(ref(database, 'transactions/' + transaction.id), transaction)
  }

  const remoteRemoveTransaction = (id: string) => {
    return remove(ref(database, 'transactions/' + id))
  }

  const onAddTransaction = (callback: (data: any) => void) => {
    return onChildAdded(transactionsRef, (data) => {
      callback({ id: data.key, ...data.val() })
    })
  }

  const onChangeTransaction = (callback: (data: any) => void) => {
    return onChildChanged(transactionsRef, (data) => {
      callback({ id: data.key, ...data.val() })
    })
  }

  const onRemoveTransaction = (callback: (data: any) => void) => {
    return onChildRemoved(transactionsRef, (data) => {
      callback({ id: data.key, ...data.val() })
    })
  }

  return {
    remoteAddTransaction,
    remoteRemoveTransaction,
    onAddTransaction,
    onChangeTransaction,
    onRemoveTransaction,
    initialLoad,
  }
}
