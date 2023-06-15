import { useState } from 'react'
import { MainTemplate, Table } from '@/components'
import { usePaymentMethods, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { PaymentMethodsFilterModel, TransactionType } from '@/types'
import {
  filterPaymentMethodsFormDefaultValues,
  ModalFilters,
} from './components'
import {
  generateData,
  getButtons,
  getCaption,
  getCharts,
  getColumns,
} from './constants'

export const PaymentMethods = () => {
  const storage = useLocalStorage()
  const { isLoadingCache } = useTransactions()
  const { generateFilteredPaymentMethods, generatePaymentMethodsHistory } =
    usePaymentMethods()
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [isFilterMonthDisabled, setIsFilterMonthDisabled] = useState(false)
  const [currentType, setCurrentType] = useState<TransactionType>('outcome')
  const [filters, setFilters] = useState<PaymentMethodsFilterModel>(
    storage.get(
      'payment-methods-page-filters',
      filterPaymentMethodsFormDefaultValues
    )
  )

  const areaChartData = generatePaymentMethodsHistory(filters, currentType)
  const paymentMethodsByDate = generateFilteredPaymentMethods(
    filters,
    currentType
  )
  const { data, chartData } = generateData(paymentMethodsByDate, currentType)

  const buttons = getButtons(() => setIsModalFiltersOpen(true))
  const caption = getCaption({ currentType, setCurrentType })
  const charts = getCharts(chartData, areaChartData)
  const columns = getColumns(currentType)

  const handleViewChange = (view: string) => {
    setIsFilterMonthDisabled(view === 'area')
  }

  const handleFilter = (filters: PaymentMethodsFilterModel) => {
    setFilters(filters)
    storage.set('payment-methods-page-filters', filters)
  }

  return (
    <MainTemplate>
      <Table
        sortBy={currentType}
        isLoading={isLoadingCache}
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
