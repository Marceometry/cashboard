import { Grid } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Content = ({ children }: Props) => {
  return (
    <Grid
      templateRows='repeat(6, 1fr)'
      templateColumns='repeat(6, 1fr)'
      maxH='calc(100vh - 112px)'
      gap='8'
    >
      {children}
    </Grid>
  )
}
