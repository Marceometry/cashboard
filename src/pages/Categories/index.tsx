import { useState } from 'react'
import { Card, MainTemplate, Table } from '@/components'
import { TransactionType, useTransactions } from '@/contexts'
import { ModalFilters } from './components'
import {
  FilterModel,
  generateData,
  getColumns,
  getCaption,
  getCharts,
  getButtons,
} from './constants'

export const Categories = () => {
  const { generateCategoriesByDate, generateCategoriesHistory } =
    useTransactions()
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] = useState<FilterModel>({ month: 0, year: 0 })
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [isFilterDisabled, setIsFilterDisabled] = useState(false)

  const areaChartData = generateCategoriesHistory(currentType)
  const categoriesByDate = generateCategoriesByDate(filters.month, filters.year)
  const { data, chartData } = generateData(categoriesByDate, currentType)

  const caption = getCaption({ currentType, setCurrentType })
  const buttons = getButtons(
    () => setIsModalFiltersOpen(true),
    isFilterDisabled
  )
  const columns = getColumns(currentType)
  const charts = getCharts(chartData, areaChartData)

  const handleViewChange = (view: string) => {
    setIsFilterDisabled(view === 'area')
  }

  return (
    <MainTemplate>
      <Card position='relative'>
        <Table
          sortBy={currentType}
          buttons={buttons}
          columns={columns}
          caption={caption}
          charts={charts}
          data={data}
          onViewChange={handleViewChange}
          noSearch
        />

        <ModalFilters
          handleFilter={setFilters}
          isOpen={isModalFiltersOpen}
          onClose={() => setIsModalFiltersOpen(false)}
        />
      </Card>
    </MainTemplate>
  )
}
