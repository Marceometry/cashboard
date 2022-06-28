import { Flex, GridItem } from '@chakra-ui/react'
import { Content, FloatButton, Header, Main, Sidebar } from '@/components'
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
          {/* <GridItem rowSpan={4} colSpan={6}>
            <Earnings data={tabsData} />
          </GridItem> */}

          <GridItem rowSpan={8} colSpan={7}>
            <CategoryCosts />
          </GridItem>

          <GridItem rowSpan={8} colSpan={5}>
            <RecentTransactions />
          </GridItem>

          {/* <GridItem rowSpan={6} colSpan={4}>
            <Invested
              balance={{ value: 1470.3, percentage: 12, increase: true }}
            />
          </GridItem> */}

          <FloatButton />
        </Content>
      </Main>
    </Flex>
  )
}
