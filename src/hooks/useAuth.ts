import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@/hooks'

type User = {
  name: string
  avatarUrl: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const storage = useLocalStorage()

  const user: User = storage.get('account')

  const signIn = (user: User) => {
    storage.set('account', user)
    navigate('/')
  }

  const signOut = () => {
    storage.remove('account')
    navigate('/login')
  }

  return { user, signIn, signOut }
}
