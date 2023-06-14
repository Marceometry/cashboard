import { useState } from 'react'
import { MainTemplate, Table } from '@/components'
import { useCategories, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { CategoriesFilterModel, TransactionType } from '@/types'
import { filterCategoriesFormDefaultValues, ModalFilters } from './components'
import {
  generateData,
  getButtons,
  getCaption,
  getCharts,
  getColumns,
} from './constants'

export const Categories = () => {
  const storage = useLocalStorage()
  const { isLoading } = useTransactions()
  const { generateFilteredCategories, generateCategoriesHistory } =
    useCategories()
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [isFilterMonthDisabled, setIsFilterMonthDisabled] = useState(false)
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] = useState<CategoriesFilterModel>(
    storage.get('categories-page-filters') || filterCategoriesFormDefaultValues
  )

  const areaChartData = generateCategoriesHistory(filters, currentType)
  const categoriesByDate = generateFilteredCategories(filters, currentType)
  const { data, chartData } = generateData(categoriesByDate, currentType)

  const buttons = getButtons(() => setIsModalFiltersOpen(true))
  const caption = getCaption({ currentType, setCurrentType })
  const charts = getCharts(chartData, areaChartData)
  const columns = getColumns(currentType)

  const handleViewChange = (view: string) => {
    setIsFilterMonthDisabled(view === 'area')
  }

  const handleFilter = (filters: CategoriesFilterModel) => {
    setFilters(filters)
    storage.set('categories-page-filters', filters)
  }

  return (
    <MainTemplate>
      <Table
        sortBy={currentType}
        isLoading={isLoading}
        buttons={buttons}
        columns={columns}
        caption={caption}
        charts={charts}
        data={data}
        onViewChange={handleViewChange}
        noSearch
      />

      <ModalFilters
        handleFilter={handleFilter}
        isOpen={isModalFiltersOpen}
        onClose={() => setIsModalFiltersOpen(false)}
        isMonthDisabled={isFilterMonthDisabled}
      />
    </MainTemplate>
  )
}
