import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogo } from 'phosphor-react'
import { Button, LoginTemplate, Logo } from '@/components'
import { useAuth } from '@/contexts'

export const Login = () => {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <LoginTemplate>
      <Logo />

      <Button
        leftIcon={<GoogleLogo weight='fill' size={24} />}
        onClick={signIn}
        mt='4'
      >
        Entrar com Google
      </Button>
    </LoginTemplate>
  )
}
