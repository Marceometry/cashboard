import { useState } from 'react'
import { Card, MainTemplate, Table } from '@/components'
import {
  CategoriesFilterModel,
  TransactionType,
  useCategories,
} from '@/contexts'
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
  const { generateFilteredCategories, generateCategoriesHistory } =
    useCategories()
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [isFilterMonthDisabled, setIsFilterMonthDisabled] = useState(false)
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] =
    useState<CategoriesFilterModel>(defaultFilterValues)

  const areaChartData = generateCategoriesHistory(filters, currentType)
  const categoriesByDate = generateFilteredCategories(filters, currentType)
  const { data, chartData } = generateData(categoriesByDate, currentType)

  const caption = getCaption({ currentType, setCurrentType })
  const buttons = getButtons(() => setIsModalFiltersOpen(true))
  const columns = getColumns(currentType)
  const charts = getCharts(chartData, areaChartData)

  const handleViewChange = (view: string) => {
    setIsFilterMonthDisabled(view === 'area')
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
          isMonthDisabled={isFilterMonthDisabled}
        />
      </Card>
    </MainTemplate>
  )
}
