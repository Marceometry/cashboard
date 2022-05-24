import { Flex, GridItem } from '@chakra-ui/react'
import { Content, Header, Main, Sidebar } from '@/components'
import { Earnings } from './components'
import { tabsData } from './constants'

export const Home = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Main>
        <Header />
        <Content>
          <GridItem rowSpan={2} colSpan={3} h='full'>
            <Earnings data={tabsData} />
          </GridItem>
        </Content>
      </Main>
    </Flex>
  )
}
