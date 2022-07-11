import { useState } from 'react'
import { CHART_COLORS } from '@/constants'
import { Card, MainTemplate, Table } from '@/components'
import { TransactionType, useTransactions } from '@/contexts'
import { FilterModel, generateData, getColumns } from './constants'
import { Caption } from './components'

export const Categories = () => {
  const { generateCategoriesByDate, generateCategoriesHistory } =
    useTransactions()
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] = useState<FilterModel>({ month: 0, year: 0 })

  const list = generateCategoriesByDate(filters.month, filters.year)
  const { data, chartData } = generateData(list, currentType)
  const columns = getColumns(currentType)
  const caption = (
    <Caption currentType={currentType} setCurrentType={setCurrentType} />
  )

  const chart3Data = generateCategoriesHistory(currentType)

  return (
    <MainTemplate>
      <Card position='relative'>
        <Table
          mx='auto'
          sortBy='outcome'
          columns={columns}
          caption={caption}
          charts={[
            {
              type: 'pie',
              data: chartData,
            },
            {
              type: 'bar',
              data: chart3Data,
              bars: chartData.map((item, index) => ({
                label: item.name,
                dataKey: item.name,
                color: CHART_COLORS[index % CHART_COLORS.length],
              })),
            },
          ]}
          data={data}
          noSearch
        />
      </Card>
    </MainTemplate>
  )
}
