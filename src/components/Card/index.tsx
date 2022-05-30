import { Box, Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Card = ({ children }: Props) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box bg={bg} h='full' pt='4' pl='4' rounded='md' shadow='lg'>
      <Grid templateColumns='1fr' h='full'>
        <GridItem h='full' pb='4' pr='4' overflow='auto'>
          <Flex direction='column' h='full'>
            {children}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  )
}
