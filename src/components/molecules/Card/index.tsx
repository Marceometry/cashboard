import { ReactNode } from 'react'
import { Box, ChakraProps, Flex, useColorModeValue } from '@chakra-ui/react'

interface CardProps extends ChakraProps {
  children: ReactNode
}

export const Card = ({ children, ...props }: CardProps) => {
  const bg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      bg={bg}
      flex='1'
      pt='3'
      pl='3'
      pb='3'
      rounded='md'
      shadow='lg'
      overflow='hidden'
      {...props}
    >
      <Flex
        direction='column'
        h='full'
        pr='4'
        pl='1'
        pt='1'
        pb='1'
        overflow='auto'
      >
        {children}
      </Flex>
    </Box>
  )
}
