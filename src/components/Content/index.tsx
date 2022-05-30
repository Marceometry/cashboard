import { Grid } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Content = ({ children }: Props) => {
  return (
    <Grid
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
      maxH='calc(100vh - 104px)'
      gap='6'
    >
      {children}
    </Grid>
  )
}
