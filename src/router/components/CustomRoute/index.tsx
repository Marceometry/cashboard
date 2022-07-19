import { useAuth } from '@/hooks'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  isPublic?: boolean
}

export const CustomRoute = ({ children, isPublic }: Props) => {
  const { user } = useAuth()

  if (isPublic || !!user) return <>{children}</>

  return <Navigate to='/login' />
}
