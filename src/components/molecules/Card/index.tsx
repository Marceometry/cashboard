import { Box, ChakraComponent, Flex, useColorModeValue } from '@chakra-ui/react'

export const Card: ChakraComponent<'div', {}> = ({ children, ...props }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      bg={bg}
      flex='1'
      pt='3'
      pl='4'
      pb='4'
      rounded='md'
      shadow='lg'
      overflow='hidden'
      {...props}
    >
      <Flex direction='column' h='full' pr='4' pt='1' overflow='auto'>
        {children}
      </Flex>
    </Box>
  )
}
