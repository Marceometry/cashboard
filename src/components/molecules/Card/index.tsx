import { ReactNode } from 'react'
import { ChakraProps, Flex, useColorModeValue } from '@chakra-ui/react'

interface CardProps extends ChakraProps {
  children: ReactNode
}

export const Card = ({ children, ...props }: CardProps) => {
  const bg = useColorModeValue('whitesmoke', 'gray.800')

  return (
    <Flex
      flex='1'
      direction='column'
      overflow='auto'
      shadow='lg'
      rounded={{ base: 'none', sm: 'md' }}
      bg={bg}
      {...props}
    >
      {children}
    </Flex>
  )
}
