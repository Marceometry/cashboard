import { useState } from 'react'
import { MainTemplate, Table } from '@/components'
import {
  CategoriesFilterModel,
  TransactionType,
  useCategories,
} from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { ModalFilters } from './components'
import { defaultFilterValues } from './types'
import {
  generateData,
  getColumns,
  getCaption,
  getCharts,
  getButtons,
} from './constants'

export const Categories = () => {
  const storage = useLocalStorage()
  const { generateFilteredCategories, generateCategoriesHistory, isLoading } =
    useCategories()
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [isFilterMonthDisabled, setIsFilterMonthDisabled] = useState(false)
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] = useState<CategoriesFilterModel>(
    storage.get('categories-page-filters') || defaultFilterValues
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
