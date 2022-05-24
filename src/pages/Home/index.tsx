import { Flex, GridItem } from '@chakra-ui/react'
import { Content, Header, Main, Sidebar } from '@/components'
import { Earnings } from './components'

export const Home = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Main>
        <Header />
        <Content>
          <GridItem rowSpan={2} colSpan={3} h='full'>
            <Earnings />
          </GridItem>
        </Content>
      </Main>
    </Flex>
  )
}
