import { Flex } from '@chakra-ui/react'
import { Sidebar, Header } from '@/components'
import { CategoryCosts } from './CategoryCosts'

export const Categories = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Flex direction='column' w='full' h='full' p='6' gap='6'>
        <Header />

        <CategoryCosts />
      </Flex>
    </Flex>
  )
}
