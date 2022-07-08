import { Flex } from '@chakra-ui/react'
import { Sidebar, Header } from '@/components'

type Props = {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Flex flex='1' overflow='auto'>
        <Flex direction='column' w='full' flex='1' p='6' gap='6'>
          <Header />
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
