/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { Database, getDatabase } from 'firebase/database'
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
  const [database, setDatabase] = useState<Database | null>(null)
  const [auth, setAuth] = useState<Auth | null>(null)
  const [userId, setUserId] = useState<string | undefined>('')
  const {
    firebaseSignOut,
    signInWithGoogle,
    updateCurrentUser,
    deleteCurrentAccount,
  } = useFirebaseAuth(database, auth)
  const {
    onTransactionsValue,
    remoteAddTransaction,
    remoteRemoveTransaction,
    onRecurrencesValue,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
  } = useFirebaseDatabase(database, userId)

  const onAuthChange = useCallback(
    (callback: (user: any) => void) => {
      callback(storage.getUser())
      if (!auth) return () => {}

      return onAuthStateChanged(auth, (user) => {
        const uid = user?.uid
        storage.setUser(user)
        setUserId(uid)
        callback(user)
      })
    },
    [auth, isOnline]
  )

  useEffect(() => {
    if (isOnline) {
      initializeApp(firebaseConfig)
      const database = getDatabase()
      const auth = getAuth()
      setDatabase(database)
      setAuth(auth)
    } else {
      setDatabase(null)
      setAuth(null)
    }
  }, [isOnline])

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
