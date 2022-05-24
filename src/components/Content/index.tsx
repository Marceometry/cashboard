import { Grid } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Content = ({ children }: Props) => {
  return (
    <Grid
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap='4'
      h='full'
    >
      {children}
    </Grid>
  )
}
