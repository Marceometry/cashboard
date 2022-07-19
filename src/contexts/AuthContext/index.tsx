import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useFirebase } from '@/hooks'

type User = {
  name: string
  email: string
  photoUrl: string
}

export type AuthContextData = {
  user: User | null
  isLoading: boolean
  signIn: () => void
  signOut: () => void
}

export type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { signInWithGoogle, firebaseSignOut, onAuthChange } = useFirebase()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signOut = async () => {
    setIsLoading(true)
    try {
      await firebaseSignOut()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(
        currentUser
          ? {
              email: currentUser.email,
              name: currentUser.displayName,
              photoUrl: currentUser.photoURL,
            }
          : null
      )
      setIsLoading(false)
    })
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
