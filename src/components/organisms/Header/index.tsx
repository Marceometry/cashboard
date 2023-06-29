import { useLocation } from 'react-router-dom'
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { MobileLinkMenu, UserMenu } from '@/components'
import { dashboardRoutes } from '@/router'

export const Header = () => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const location = useLocation()

  const currentPage = dashboardRoutes.find(
    (route) => route.path === location.pathname
  )?.label

  const padding = isSmallScreen ? '4' : '0'

  return (
    <Flex as='header' gap='4' pt={padding} px={padding}>
      {isSmallScreen && <MobileLinkMenu />}
      <Flex align='center' justify='space-between' w='full'>
        <Heading size='lg'>{currentPage}</Heading>
        <UserMenu />
      </Flex>
    </Flex>
  )
}
