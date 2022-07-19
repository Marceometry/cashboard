import { Navigate } from 'react-router-dom'
import { LoadingTemplate } from '@/components'
import { useAuth } from '@/contexts'

type Props = {
  children: React.ReactNode
  isPublic?: boolean
}

export const CustomRoute = ({ children, isPublic }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <LoadingTemplate />

  if (isPublic || !!user) return <>{children}</>

  return <Navigate to='/login' />
}
