import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useFirebaseContext } from '@/contexts'
import { useApiCall, useLocalStorage } from '@/hooks'
import { AuthContextData, GoogleUser, User } from './types'
import { formatUser } from './utils'

export type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const storage = useLocalStorage()
  const authApi = useApiCall()
  const updateUserApi = useApiCall(false)
  const deleteAccountApi = useApiCall(false)
  const {
    updateCurrentUser,
    signInWithGoogle,
    firebaseSignOut,
    onAuthChange,
    deleteCurrentAccount,
  } = useFirebaseContext()
  const [user, setUser] = useState<User | null>(formatUser(storage.getUser()))

  const signIn = authApi.call(
    async () => {
      const response = await signInWithGoogle()
      return response?.user?.displayName
    },
    {
      startInfoToast: 'Faça login com sua conta Google',
      toastText: (name) => `Bem vindo(a), ${name}!`,
    }
  )

  const signOut = authApi.call(async () => await firebaseSignOut(), {
    toastText: 'Você foi desconectado com sucesso!',
  })

  const updateUser = updateUserApi.call(
    async (name: string) => {
      if (!user) return
      await updateCurrentUser(name)
      setUser({ ...user, name })
      return name
    },
    {
      toastText: (name) => `Seu nome foi alterado para ${name}!`,
      toastError: 'Algo deu errado ao alterar seu nome',
    }
  )

  const deleteAccount = deleteAccountApi.call(
    async () => {
      const user = await deleteCurrentAccount()
      if (!user?.uid) throw new Error()
    },
    {
      toastText: 'Sua conta foi excluída com sucesso',
      toastError: 'Algo deu errado ao excluir sua conta',
      toastSuccessAsInfo: true,
      toastDuration: 5000,
    }
  )

  const handleAuthChange = (currentUser: GoogleUser) => {
    setUser(formatUser(currentUser))
    authApi.setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthChange(handleAuthChange)
    return () => {
      unsubscribe()
    }
  }, [onAuthChange])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: authApi.isLoading,
        isDeletingAccount: deleteAccountApi.isLoading,
        signIn,
        signOut,
        updateUser,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
