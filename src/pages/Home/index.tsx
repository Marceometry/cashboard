import { Flex, GridItem } from '@chakra-ui/react'
import { Content, Header, Main, Sidebar } from '@/components'
import {
  CategoryCosts,
  Earnings,
  Invested,
  RecentTransactions,
} from './components'
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

          <GridItem rowSpan={3} colSpan={2}>
            <Invested
              balance={{ value: 1470.3, percentage: 12, increase: true }}
            />
          </GridItem>
        </Content>
      </Main>
    </Flex>
  )
}
