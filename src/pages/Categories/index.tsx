import { useState } from 'react'
import { Card, PieChart, MainTemplate, Tabs } from '@/components'
import { TransactionType, useTransactions } from '@/contexts'
import { generateData, getTabs } from './constants'
import { Button, Flex } from '@chakra-ui/react'

export const Categories = () => {
  const { categoryList } = useTransactions()
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [currentView, setCurrentView] = useState<'table' | 'chart'>('table')

  const { data, chartData } = generateData(categoryList, currentType)

  const handleTabsChange = (index: number) => {
    setCurrentType(index === 0 ? 'outcome' : 'income')
  }

  const tabs = getTabs(data, currentView, () => setCurrentView('chart'))

  return (
    <MainTemplate>
      <Card position='relative'>
        <Tabs tabs={tabs} onChange={handleTabsChange} />
        {currentView === 'chart' && (
          <>
            <Flex justifyContent='flex-end' mt='-1' pr='7'>
              <Button onClick={() => setCurrentView('table')}>
                Mostrar Tabela
              </Button>
            </Flex>
            <PieChart data={chartData} />
          </>
        )}
      </Card>
    </MainTemplate>
  )
}
