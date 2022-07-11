import { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDebouncedValue, useLocalStorage } from '@/hooks'
import { BarChart } from '@/components'
import { TableBody, TableHeader } from './components'
import { filterByText } from './utils'
import { TableProps } from './types'

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  noSearch,
  chartData,
  chartBars,
  ...props
}: TableProps) => {
  const storage = useLocalStorage()
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)
  const [currentView, setCurrentView] = useState<'table' | 'chart'>(
    !!chartBars?.length && storage.get('default-table-view') === 'chart'
      ? 'chart'
      : 'table'
  )

  const toggleChart = () => {
    setCurrentView((oldState) => {
      const value = oldState === 'chart' ? 'table' : 'chart'
      storage.set('default-table-view', value)
      return value
    })
  }

  const handleSearch = (text: string) => {
    return filterByText(data, columns, text)
  }

  useEffect(() => {
    if (noSearch) return setFilteredData(data)
    const searchResult = handleSearch(debouncedSearchText)
    setFilteredData(searchResult)
  }, [data, debouncedSearchText])

  return (
    <Flex flex='1' direction='column' overflow='hidden' p='1'>
      <TableHeader
        caption={caption}
        noSearch={noSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        buttons={buttons}
        toggleChart={toggleChart}
        isChartView={currentView === 'chart'}
        showToggleChartButton={!!chartBars?.length}
      />

      {currentView === 'table' ? (
        <TableBody data={filteredData} columns={columns} {...props} />
      ) : (
        <Box h='100%'>
          <BarChart data={chartData} bars={chartBars} />
        </Box>
      )}
    </Flex>
  )
}
