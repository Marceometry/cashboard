import { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDebouncedValue } from '@/hooks'
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
  onViewChange,
  ...props
}: TableProps) => {
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)
  const [currentView, setCurrentView] = useState<'table' | ChartType>('table')
  const currentChart = charts?.find((chart) => chart.type === currentView)

  const toggleChart = (type: ChartType) => {
    setCurrentView((oldState) => (oldState === type ? 'table' : type))
  }

  const handleSearch = (text: string) => {
    return filterByText(data, columns, text)
  }

  useEffect(() => {
    if (noSearch) return setFilteredData(data)
    const searchResult = handleSearch(debouncedSearchText)
    setFilteredData(searchResult)
  }, [data, debouncedSearchText])

  useEffect(() => {
    onViewChange?.(currentView)
  }, [currentView])

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
              isMonth={currentChart?.isMonth}
            />
          )}
        </Box>
      )}
    </Flex>
  )
}
