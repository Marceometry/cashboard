import { useState } from 'react'
import { useTransactions } from '@/contexts'
import { ComposedChart, Loading, MainTemplate, Tabs } from '@/components'
import { getChartData, getChartSections, getTabs, View } from './constants'

export const Home = () => {
  const { transactionList, isLoading } = useTransactions()
  const [currentView, setCurrentView] = useState<View>('month')

  const chartData = getChartData(transactionList, currentView)
  const chartSections = getChartSections(currentView)

  const tabs = getTabs(chartData)
  const handleTabsChange = (index: number) => {
    let view: View = 'month'
    switch (index) {
      case 0:
        view = 'month'
        break
      case 1:
        view = 'year'
        break
    }
    setCurrentView(view)
  }

  return (
    <MainTemplate>
      <Tabs tabs={tabs} onChange={handleTabsChange} flex='none' />

      {isLoading ? (
        <Loading />
      ) : (
        <ComposedChart
          type='area'
          labelType={currentView}
          sections={chartSections}
          data={chartData}
        />
      )}
    </MainTemplate>
  )
}
