import {
  getDatabase,
  remove,
  set,
  ref,
  onValue,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
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

  const loadTransactionList = (
    callback: (list: TransactionModel[]) => void
  ) => {
    return onValue(
      transactionsRef,
      (snapshot) => {
        const array: TransactionModel[] = []
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          array.push({ ...childData, id: childKey })
        })
        callback(array)
      },
      { onlyOnce: true }
    )
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
    loadTransactionList,
    remoteAddTransaction,
    remoteRemoveTransaction,
    onAddTransaction,
    onChangeTransaction,
    onRemoveTransaction,
  }
}
