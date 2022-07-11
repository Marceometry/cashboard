import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { AreaChart, Card, MainTemplate, Tabs } from '@/components'
import { TransactionModel, useTransactions } from '@/contexts'
import { generateChartData, getTabs } from './constants'

export const Home = () => {
  const { transactionList } = useTransactions()
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  const [incomeItems, outcomeItems] = transactionList.reduce(
    (acc, item) => {
      const index = item.type === 'income' ? 0 : 1
      const value = [...acc[index], item]
      acc[index] = value
      return acc
    },
    [[], []] as TransactionModel[][]
  )

  const handleTabsChange = (index: number) => {
    const currentMonth = new Date().getMonth()
    let month = null
    switch (index) {
      case 1:
        month = currentMonth
        break
      case 2:
        month = currentMonth - 1
        break
      default:
        break
    }
    setSelectedMonth(month)
  }

  const tabs = getTabs(incomeItems, outcomeItems)

  const { incomeData, outcomeData } = generateChartData(
    transactionList,
    selectedMonth
  )

  return (
    <MainTemplate>
      <Card>
        <Tabs tabs={tabs} onChange={handleTabsChange} flex='none' />

        <Grid templateColumns='1fr 1fr' h='100%'>
          <GridItem>
            <AreaChart
              data={incomeData}
              areaLabel='Entrada'
              areaColor='#48bb78'
              isMonth={!selectedMonth}
            />
          </GridItem>
          <GridItem>
            <AreaChart
              data={outcomeData}
              areaLabel='Saída'
              areaColor='#f56565'
              isMonth={!selectedMonth}
            />
          </GridItem>
        </Grid>
      </Card>
    </MainTemplate>
  )
}
