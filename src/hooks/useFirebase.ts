import { getDatabase, set, ref, onValue } from 'firebase/database'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { firebaseApp } from '@/services'
import { TransactionModel } from '@/contexts'

export const useFirebase = () => {
  const database = getDatabase(firebaseApp)
  const auth = getAuth()
  const authProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, authProvider)
  }

  const firebaseSignOut = () => {
    return signOut(auth)
  }

  const onAuthChange = (callback: (user: any) => void) => {
    return onAuthStateChanged(auth, callback)
  }

  const writeData = (path: string, payload: any) => {
    set(ref(database, path), payload)
  }

  const writeTransaction = (transaction: TransactionModel) => {
    writeData('transactions/' + transaction.id, transaction)
  }

  return {
    signInWithGoogle,
    firebaseSignOut,
    onAuthChange,
    writeTransaction,
  }
}
