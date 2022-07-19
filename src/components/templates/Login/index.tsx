import { Grid } from '@chakra-ui/react'
import { Card } from '@/components'

type Props = {
  children: React.ReactNode
}

export const LoginTemplate = ({ children }: Props) => {
  return (
    <Grid placeItems='center' h='100vh'>
      <Card w='80vw' maxW='400px'>
        {children}
      </Card>
    </Grid>
  )
}
