import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Card, Header, Sidebar } from '@/components'

type Props = {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  const showSidebar = useBreakpointValue({ base: false, sm: true })

  return (
    <Flex h={window.innerHeight} maxH='100vh'>
      {showSidebar && <Sidebar />}
      <Flex flex='1' overflow='auto'>
        <Flex direction='column' w='full' flex='1' p='5' gap='5'>
          <Header isSidebarAppearing={showSidebar} />
          <Card>{children}</Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
