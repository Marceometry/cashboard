import { Flex } from '@chakra-ui/react'

type Props = { children: React.ReactNode }

export const Main = ({ children }: Props) => {
  return (
    <Flex as='main' w='full' h='full' p='8' gap='8' direction='column'>
      {children}
    </Flex>
  )
}
