import { useState } from 'react'
import { Card, PieChart, MainTemplate, Tabs } from '@/components'
import { TransactionType, useTransactions } from '@/contexts'
import { generateData, getTabs } from './constants'

export const Categories = () => {
  const { categoryList } = useTransactions()
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [currentView, setCurrentView] = useState<'table' | 'chart'>('table')

  const { data, chartData } = generateData(categoryList, currentType)

  const handleTabsChange = (index: number) => {
    setCurrentType(index === 0 ? 'outcome' : 'income')
  }

  const tabs = getTabs(data, currentView)

  return (
    <MainTemplate>
      <Card position='relative'>
        <Tabs tabs={tabs} onChange={handleTabsChange} />
        {currentView === 'chart' && <PieChart data={chartData} />}
        <button
          style={{ position: 'absolute', right: 40, top: 64 }}
          onClick={() =>
            setCurrentView(currentView === 'table' ? 'chart' : 'table')
          }
        >
          alterar view
        </button>
      </Card>
    </MainTemplate>
  )
}
