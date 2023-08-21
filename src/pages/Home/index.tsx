import { Link } from 'react-router-dom'
import { Grid, Text } from '@chakra-ui/react'
import { Button, Card, Logo } from '@/components'

export const Home = () => {
  return (
    <Grid w='100vw' h='100vh' placeItems='center'>
      <Card p='4' gap='8'>
        <Logo />
        <Text fontSize='lg' textAlign='center'>
          Controle sua vida financeira da forma que preferir
        </Text>
        <Button as={Link} to='/login'>
          Entrar
        </Button>
      </Card>
    </Grid>
  )
}
