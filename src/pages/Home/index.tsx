import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Card, ComposedChart, Loading, MainTemplate, Tabs } from '@/components'
import { TransactionModel, useTransactions } from '@/contexts'
import { generateChartData, getTabs, View } from './constants'

export const Home = () => {
  const { transactionList, isLoading } = useTransactions()
  const [currentView, setCurrentView] = useState<View>('total')

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
    let view: View = 'total'
    switch (index) {
      case 1:
        view = 'month'
        break
      case 2:
        view = 'year'
        break
    }
    setCurrentView(view)
  }

  const tabs = getTabs(incomeItems, outcomeItems)

  const { incomeData, outcomeData } = generateChartData(
    transactionList,
    currentView
  )

  return (
    <MainTemplate>
      <Card>
        <Tabs tabs={tabs} onChange={handleTabsChange} flex='none' />

        <Grid templateColumns='1fr 1fr' h='100%'>
          <GridItem>
            {isLoading ? (
              <Loading />
            ) : (
              <ComposedChart
                type='area'
                isMonth={currentView !== 'month'}
                data={incomeData}
                sections={[
                  {
                    label: 'Entrada',
                    color: '#48bb78',
                  },
                ]}
              />
            )}
          </GridItem>
          <GridItem>
            {isLoading ? (
              <Loading />
            ) : (
              <ComposedChart
                type='area'
                isMonth={currentView !== 'month'}
                data={outcomeData}
                sections={[
                  {
                    label: 'Saída',
                    color: '#f56565',
                  },
                ]}
              />
            )}
          </GridItem>
        </Grid>
      </Card>
    </MainTemplate>
  )
}
