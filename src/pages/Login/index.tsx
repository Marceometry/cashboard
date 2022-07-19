import { Center, Grid, GridItem, Heading, Button } from '@chakra-ui/react'
import { GoogleLogo } from 'phosphor-react'
import { LoginTemplate } from '@/components'
import { useAuth } from '@/hooks'

export const Login = () => {
  const { signIn } = useAuth()

  const handleSignIn = () => {
    const user = {
      name: 'Marcelino Teixeira',
      avatarUrl: 'https://github.com/marceometry.png',
    }
    signIn(user)
  }

  return (
    <LoginTemplate>
      <Center>
        <Heading fontSize='3xl'>Entre na sua conta</Heading>
      </Center>

      <Grid mt='8'>
        <GridItem>
          <Button leftIcon={<GoogleLogo />} onClick={handleSignIn} w='100%'>
            Entrar com Google
          </Button>
        </GridItem>
      </Grid>
    </LoginTemplate>
  )
}
