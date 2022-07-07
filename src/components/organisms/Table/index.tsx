import { useEffect, useState } from 'react'
import { useDebouncedValue } from '@/hooks'
import { ModalFilters, TableBody, TableHeader } from './components'
import { filterByMonth, filterByText, filterByYear, filterData } from './utils'
import { FilterModel, TableProps } from './types'

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
  const [isModalFiltersOpen, setIsModalFiltersOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)

  const handleFilter = (filters: FilterModel) => {
    const filtered = filterData([...data], filters, dateField)
    setFilteredData(filtered)
  }

  const handleSearch = (text: string) => {
    const filtered = filterByText([...data], columns, text)
    setFilteredData(filtered)
  }

  useEffect(() => {
    handleSearch(debouncedSearchText)
  }, [data, debouncedSearchText])

  return (
    <div>
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
        handleFilter={handleFilter}
      />

      <TableBody
        data={filteredData}
        columns={columns}
        sortBy={sortBy}
        {...props}
      />
    </div>
  )
}
