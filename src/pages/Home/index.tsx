import { Flex, GridItem } from '@chakra-ui/react'
import { Content, Header, Main, Sidebar } from '@/components'
import { CategoryCosts, Earnings, RecentTransactions } from './components'
import { tabsData } from './constants'

export const Home = () => {
  return (
    <Flex h='100vh'>
      <Sidebar />
      <Main>
        <Header />
        <Content>
          <GridItem rowSpan={2} colSpan={3}>
            <Earnings data={tabsData} />
          </GridItem>

          <GridItem rowSpan={2} colSpan={3}>
            <RecentTransactions />
          </GridItem>

          <GridItem rowSpan={3} colSpan={4}>
            <CategoryCosts />
          </GridItem>
        </Content>
      </Main>
    </Flex>
  )
}
