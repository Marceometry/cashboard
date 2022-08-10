import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Sidebar, Header } from '@/components'

type Props = {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  const showSidebar = useBreakpointValue({ base: false, sm: true })

  return (
    <Flex h='100vh'>
      {showSidebar && <Sidebar />}
      <Flex flex='1' overflow='auto'>
        <Flex direction='column' w='full' flex='1' p='5' gap='5'>
          <Header isSidebarAppearing={showSidebar} />
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
