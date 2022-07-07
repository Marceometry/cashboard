import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { getMonth, getYear } from 'date-fns'
import { useDebouncedValue } from '@/hooks'
import { ModalFilters, TableBody, TableHeader } from './components'
import { filterByText, filterData } from './utils'
import { FilterModel, TableProps } from './types'

export const defaultFilterValues: FilterModel = {
  selectedMonth: getMonth(new Date()) + 1,
  selectedYear: getYear(new Date()),
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}

export const emptyFilterValues: FilterModel = {
  selectedMonth: 0,
  selectedYear: 0,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  sortBy,
  noFilters,
  dateField = 'date',
  ...props
}: TableProps) => {
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [filters, setFilters] = useState(defaultFilterValues)
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)

  const handleFilter = (filters: FilterModel) => {
    return filterData(data, filters, dateField)
  }

  const handleSearch = (data: any[], text: string) => {
    return filterByText(data, columns, text)
  }

  useEffect(() => {
    if (noFilters) return setFilteredData(data)

    const filtered = handleFilter(filters)
    const searchResult = handleSearch(filtered, debouncedSearchText)
    setFilteredData(searchResult)
  }, [data, filters, debouncedSearchText])

  return (
    <Flex direction='column' overflow='hidden' p='1'>
      <TableHeader
        caption={caption}
        noFilters={noFilters}
        searchText={searchText}
        setSearchText={setSearchText}
        buttons={buttons}
        handleOpenModalFilters={() => setIsModalFiltersOpen(true)}
      />

      <ModalFilters
        isOpen={isModalFiltersOpen}
        onClose={() => setIsModalFiltersOpen(false)}
        handleFilter={setFilters}
      />

      <TableBody
        data={filteredData}
        columns={columns}
        sortBy={sortBy}
        {...props}
      />
    </Flex>
  )
}
