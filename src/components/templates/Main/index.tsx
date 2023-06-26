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
          left={{ base: '50%', sm: '4' }}
          bottom={{ base: '2', sm: '5' }}
          transform={{ base: 'translateX(-50%)', sm: 'none' }}
          lineHeight='0'
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
