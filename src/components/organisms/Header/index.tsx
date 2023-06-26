import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { MobileSidebar, UserMenu } from '@/components'
import { dashboardRoutes } from '@/router'

export const Header = () => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  const currentPage = dashboardRoutes.find(
    (route) => route.path === location.pathname
  )?.label

  const padding = isSmallScreen ? '4' : '0'

  const handleOpenSidebar = () => setIsSidebarOpen(true)

  const handleCloseSidebar = () => setIsSidebarOpen(false)

  return (
    <Flex as='header' gap='4' pt={padding} px={padding}>
      {isSmallScreen && (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={handleOpenSidebar}
            aria-label='Expandir Sidebar'
          />
          <MobileSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        </>
      )}
      <Flex align='center' justify='space-between' w='full'>
        <Heading size='lg'>{currentPage}</Heading>
        <UserMenu />
      </Flex>
    </Flex>
  )
}
