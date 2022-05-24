import { Box, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Card = ({ children }: Props) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box bg={bg} p='6' rounded='md' shadow='lg'>
      {children}
    </Box>
  )
}
