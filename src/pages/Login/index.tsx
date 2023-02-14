import { Center, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogo } from 'phosphor-react'
import { Button, LoginTemplate } from '@/components'
import { useAuth } from '@/contexts'
import { useEffect } from 'react'

export const Login = () => {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <LoginTemplate>
      <Center>
        <Heading fontSize='3xl'>Entre na sua conta</Heading>
      </Center>

      <Button leftIcon={<GoogleLogo />} onClick={signIn} mt='8'>
        Entrar com Google
      </Button>
    </LoginTemplate>
  )
}
