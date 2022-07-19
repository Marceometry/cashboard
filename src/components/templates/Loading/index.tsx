import { Grid, Spinner } from '@chakra-ui/react'

export const LoadingTemplate = () => {
  return (
    <Grid placeItems='center' h='100vh'>
      <Spinner size='xl' />
    </Grid>
  )
}
