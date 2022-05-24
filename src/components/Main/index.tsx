import { Grid } from '@chakra-ui/react'

type Props = { children: React.ReactNode }

export const Main = ({ children }: Props) => {
  return (
    <Grid as='main' w='full' h='full' p='6' gap='6'>
      {children}
    </Grid>
  )
}
