import { Grid, GridItem, Progress, SlideFade } from '@chakra-ui/react'
import { Logo } from '@/components'

export const LoadingTemplate = () => {
  return (
    <Grid placeItems='center' h='100vh'>
      <GridItem>
        <SlideFade offsetY='20px' delay={0.5} in>
          <Logo />
        </SlideFade>

        <SlideFade offsetY='20px' delay={1.5} in>
          <Progress mt='2' size='xs' borderRadius='sm' isIndeterminate />
        </SlideFade>
      </GridItem>
    </Grid>
  )
}
