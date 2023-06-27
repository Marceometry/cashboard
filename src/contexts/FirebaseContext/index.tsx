/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  useFirebaseAuth,
  useFirebaseDatabase,
  useLocalStorage,
  useNetworkStatus,
} from '@/hooks'
import { FirebaseContextData } from './types'
import { firebaseConfig } from '@/services'

export const FirebaseContext = createContext({} as FirebaseContextData)

export function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const storage = useLocalStorage()
  const isOnline = useNetworkStatus()
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null)
  const [userId, setUserId] = useState<string | undefined>('')
  const {
    firebaseSignOut,
    signInWithGoogle,
    updateCurrentUser,
    deleteCurrentAccount,
  } = useFirebaseAuth(firebaseApp)
  const {
    onTransactionsValue,
    remoteAddTransaction,
    remoteRemoveTransaction,
    onRecurrencesValue,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
  } = useFirebaseDatabase(firebaseApp, userId)

  const onAuthChange = useCallback(
    (callback: (user: any) => void) => {
      callback(storage.getUser())
      if (!isOnline || !firebaseApp) return () => () => {}
      const auth = getAuth()
      return onAuthStateChanged(auth, (user) => {
        const uid = user?.uid
        storage.setUser(user)
        setUserId(uid)
        callback(user)
      })
    },
    [isOnline, firebaseApp]
  )

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    setFirebaseApp(app)
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        isOnline,
        onAuthChange,
        signInWithGoogle,
        firebaseSignOut,
        updateCurrentUser,
        deleteCurrentAccount,
        onTransactionsValue,
        remoteAddTransaction,
        remoteRemoveTransaction,
        onRecurrencesValue,
        remoteAddRecurrence,
        remoteRemoveRecurrence,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebaseContext = () => useContext(FirebaseContext)
