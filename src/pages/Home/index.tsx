import { Flex, GridItem } from '@chakra-ui/react'
import { Card, Content, Header, Main, Sidebar, Table } from '@/components'
import { Earnings } from './components'
import { tabsData, columns, data } from './constants'

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
          <GridItem rowSpan={2} colSpan={3} h='full'>
            <Card>
              <Table
                caption='Transações Recentes'
                columns={columns}
                data={data}
              />
            </Card>
          </GridItem>
        </Content>
      </Main>
    </Flex>
  )
}
