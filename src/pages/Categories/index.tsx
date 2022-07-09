import { useState } from 'react'
import { Card, Chart, MainTemplate, Tabs } from '@/components'
import { TransactionType, useTransactions } from '@/contexts'
import { Content, Label, generateData } from './components'

export const Categories = () => {
  const { categoryList } = useTransactions()
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [currentView, setCurrentView] = useState<'table' | 'chart'>('table')

  const { data, chartData } = generateData(categoryList, currentType)

  const handleTabsChange = (index: number) => {
    setCurrentType(index === 0 ? 'outcome' : 'income')
  }

  const tabs = [
    {
      key: 'outcome',
      label: <Label isSpent={true} />,
      content:
        currentView === 'table' ? (
          <Content data={data} type='outcome' />
        ) : (
          <></>
        ),
    },
    {
      key: 'income',
      label: <Label isSpent={false} />,
      content:
        currentView === 'table' ? <Content data={data} type='income' /> : <></>,
    },
  ]

  return (
    <MainTemplate>
      <Card position='relative'>
        <Tabs tabs={tabs} onChange={handleTabsChange} />
        {currentView === 'chart' && <Chart data={chartData} />}
        <button
          style={{ position: 'absolute', right: 36, top: 70 }}
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
