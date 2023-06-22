import { ReactNode } from 'react'
import {
  Box,
  ChakraProps,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'

interface CardProps extends ChakraProps {
  children: ReactNode
}

export const Card = ({ children, ...props }: CardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const bg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      bg={bg}
      flex='1'
      p={isSmallScreen ? '1' : '3'}
      pr='0'
      rounded='md'
      shadow='lg'
      overflow='hidden'
      {...props}
    >
      <Flex
        direction='column'
        h='full'
        p='1'
        pr={isSmallScreen ? '2' : '4'}
        overflow='auto'
      >
        {children}
      </Flex>
    </Box>
  )
}
