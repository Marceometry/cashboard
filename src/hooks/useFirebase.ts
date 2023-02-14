import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
  remove,
  set,
} from 'firebase/database'
import { TransactionModel, useAuth } from '@/contexts'
import { firebaseApp } from '@/services'

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

  const remoteAddTransaction = (transaction: TransactionModel) => {
    return set(ref(database, `${transactionsPath}/${transaction.id}`), {
      ...transaction,
      userId,
    })
  }

  const remoteRemoveTransaction = (id: string) => {
    return remove(ref(database, `${transactionsPath}/${id}`))
  }

  const onAddTransaction = (callback: (data: TransactionModel) => void) => {
    return onChildAdded(transactionsRef, (data) => {
      callback({ id: data.key, ...data.val() })
    })
  }

  const onChangeTransaction = (callback: (data: TransactionModel) => void) => {
    return onChildChanged(transactionsRef, (data) => {
      callback({ id: data.key, ...data.val() })
    })
  }

  const onRemoveTransaction = (callback: (data: TransactionModel) => void) => {
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
  }
}
