import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useApiCall, useFirebaseAuth } from '@/hooks'
import { AuthContextData, GoogleUser, User } from './types'

export type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { call, isLoading, setIsLoading } = useApiCall()
  const { signInWithGoogle, firebaseSignOut, onAuthChange } = useFirebaseAuth()
  const [user, setUser] = useState<User | null>(null)

  const signIn = call(
    async () => {
      const { user } = await signInWithGoogle()
      return user.displayName
    },
    { toastText: (name) => `Bem vindo(a), ${name}!` }
  )

  const signOut = call(
    async () => {
      await firebaseSignOut()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
    { toastText: 'Você foi desconectado com sucesso!' }
  )

  const handleAuthChange = (currentUser: GoogleUser) => {
    const userInfo = currentUser
      ? {
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        }
      : null
    setUser(userInfo)
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthChange(handleAuthChange)
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
