import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'

export const Sidebar = () => {
  const bg = useColorModeValue('gray.300', 'gray.600')

  return (
    <Flex
      as='aside'
      align='center'
      direction='column'
      maxW='container.lg'
      minW='300px'
      shadow='lg'
      p='8'
      bg={bg}
    >
      <Heading>Logo</Heading>
    </Flex>
  )
}
