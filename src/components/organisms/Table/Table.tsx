import { useEffect, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useDebouncedValue } from '@/hooks'
import { ComposedChart, EmptyData, Loading, PieChart } from '@/components'
import { TableBody, TableHeader } from './components'
import { ChartType, TableProps } from './types'
import { filterByText } from './utils'

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  noSearch,
  charts,
  onViewChange,
  isLoading,
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

      {isLoading ? (
        <Loading />
      ) : currentView === 'table' ? (
        filteredData.length ? (
          <TableBody data={filteredData} columns={columns} {...props} />
        ) : (
          <EmptyData />
        )
      ) : (
        <Box h='100%'>
          {currentChart?.type === 'pie' ? (
            <PieChart data={currentChart?.data || []} />
          ) : (
            <ComposedChart
              type={currentChart?.type!}
              data={currentChart?.data || []}
              sections={currentChart?.sections || []}
              isMonth={currentChart?.isMonth}
            />
          )}
        </Box>
      )}
    </Flex>
  )
}
