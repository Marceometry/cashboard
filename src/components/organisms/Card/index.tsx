import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const Card = ({ children }: Props) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      bg={bg}
      flex='1'
      pt='4'
      pl='4'
      pb='4'
      rounded='md'
      shadow='lg'
      overflow='hidden'
    >
      <Flex direction='column' h='full' pr='4' overflow='auto'>
        {children}
      </Flex>
    </Box>
  )
}
