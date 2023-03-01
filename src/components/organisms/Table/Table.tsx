import { useEffect, useMemo, useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
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
  onSearch,
  isLoading,
  ...props
}: TableProps) => {
  const [searchText, setSearchText] = useState('')
  const [currentView, setCurrentView] = useState<'table' | ChartType>('table')
  const currentChart = charts?.find((chart) => chart.type === currentView)

  const toggleChart = (type: ChartType) => {
    setCurrentView((oldState) => (oldState === type ? 'table' : type))
  }

  const handleSearch = (text: string) => {
    return filterByText(data, columns, text)
  }

  const filteredData = useMemo(() => {
    if (noSearch) return data
    const searchResult = handleSearch(searchText)
    return searchResult
  }, [data, searchText])

  useEffect(() => {
    onSearch?.(searchText, filteredData)
  }, [searchText, filteredData])

  useEffect(() => {
    onViewChange?.(currentView)
  }, [currentView])

  return (
    <Flex flex='1' direction='column' overflow='hidden' p='1'>
      <TableHeader
        caption={caption}
        noSearch={noSearch}
        onInputSearch={setSearchText}
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
              type={currentChart?.type}
              data={currentChart?.data || []}
              sections={currentChart?.sections || []}
              labelType={currentChart?.labelType}
            />
          )}
        </Box>
      )}
    </Flex>
  )
}
