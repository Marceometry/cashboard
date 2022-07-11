import { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDebouncedValue, useLocalStorage } from '@/hooks'
import { BarChart, PieChart } from '@/components'
import { TableBody, TableHeader } from './components'
import { filterByText } from './utils'
import { ChartType, TableProps } from './types'

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  noSearch,
  charts,
  ...props
}: TableProps) => {
  const storage = useLocalStorage()
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)
  const [currentView, setCurrentView] = useState<'table' | ChartType>(
    !charts?.length
      ? 'table'
      : storage.get('default-table-view') === 'pie'
      ? 'pie'
      : 'bar'
  )

  const toggleChart = (type: ChartType) => {
    setCurrentView((oldState) => {
      const value = oldState === type ? 'table' : type
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

  const currentChart = charts?.find((chart) => chart.type === currentView)

  return (
    <Flex flex='1' direction='column' overflow='hidden' p='1'>
      <TableHeader
        caption={caption}
        noSearch={noSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        buttons={buttons}
        toggleChart={toggleChart}
        currentView={currentView}
        charts={charts}
      />

      {currentView === 'table' ? (
        <TableBody data={filteredData} columns={columns} {...props} />
      ) : (
        <Box h='100%'>
          {currentChart?.type === 'pie' ? (
            <PieChart data={currentChart?.data || []} />
          ) : (
            <BarChart
              data={currentChart?.data || []}
              bars={currentChart?.bars || []}
            />
          )}
        </Box>
      )}
    </Flex>
  )
}
