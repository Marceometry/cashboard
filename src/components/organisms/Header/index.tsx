import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { MobileSidebar, UserMenu } from '@/components'
import { dashboardRoutes } from '@/router'

type Props = {
  isSidebarAppearing?: boolean
}

export const Header = ({ isSidebarAppearing }: Props) => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const currentPage = dashboardRoutes.find(
    (route) => route.path === location.pathname
  )?.label

  const handleOpenSidebar = () => setIsSidebarOpen(true)

  const handleCloseSidebar = () => setIsSidebarOpen(false)

  return (
    <Flex as='header' gap='4'>
      {!isSidebarAppearing && (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={handleOpenSidebar}
            aria-label='Expandir Sidebar'
          />
          <MobileSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        </>
      )}
      <Flex align='flex-start' justify='space-between' w='full'>
        <Heading size='lg'>{currentPage}</Heading>
        <UserMenu />
      </Flex>
    </Flex>
  )
}
