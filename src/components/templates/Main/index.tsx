import { Box, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { Card, Header, Sidebar } from '@/components'
import { useTransactions } from '@/contexts'

type Props = {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  const showSidebar = useBreakpointValue({ base: false, sm: true })
  const { isLoading } = useTransactions()

  return (
    <Flex h={window.innerHeight} maxH='100vh'>
      {showSidebar && <Sidebar />}

      {isLoading && (
        <Box
          position='fixed'
          left='5'
          bottom='5'
          bg='gray.800'
          borderTopRightRadius='10'
          lineHeight='0'
          pt='2'
          pr='2'
          pl='1'
          pb='1'
        >
          <Spinner size='lg' />
        </Box>
      )}

      <Flex flex='1' overflow='auto'>
        <Flex direction='column' w='full' flex='1' p='5' gap='5'>
          <Header isSidebarAppearing={showSidebar} />

          <Card>{children}</Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
