import { Flex, Heading } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { UserMenu } from '@/components'
import { dashboardRoutes } from '@/router'

export const Header = () => {
  const location = useLocation()

  const currentPage = dashboardRoutes.find(
    (route) => route.path === location.pathname
  )?.label

  return (
    <Flex as='header' align='flex-start' justify='space-between' gap='8'>
      <Heading size='lg'>{currentPage}</Heading>
      <UserMenu />
    </Flex>
  )
}
