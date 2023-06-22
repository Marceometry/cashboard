import { Box, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { Card, Header, Sidebar } from '@/components'
import { useTransactions } from '@/contexts'

type Props = {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { isLoading } = useTransactions()

  return (
    <Flex h={window.innerHeight} maxH='100vh'>
      {!isSmallScreen && <Sidebar />}

      {isLoading && (
        <Box
          position='fixed'
          bottom='0'
          left='0'
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
        <Flex
          direction='column'
          w='full'
          flex='1'
          gap={isSmallScreen ? '4' : '5'}
          p={isSmallScreen ? '0' : '5'}
        >
          <Header />

          <Card>{children}</Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
