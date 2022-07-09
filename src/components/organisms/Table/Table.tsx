import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { useDebouncedValue } from '@/hooks'
import { TableBody, TableHeader } from './components'
import { filterByText } from './utils'
import { TableProps } from './types'

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  noSearch,
  ...props
}: TableProps) => {
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)

  const handleSearch = (text: string) => {
    return filterByText(data, columns, text)
  }

  useEffect(() => {
    if (noSearch) return setFilteredData(data)
    const searchResult = handleSearch(debouncedSearchText)
    setFilteredData(searchResult)
  }, [data, debouncedSearchText])

  return (
    <Flex direction='column' overflow='hidden' p='1'>
      <TableHeader
        caption={caption}
        noSearch={noSearch}
        searchText={searchText}
        setSearchText={setSearchText}
        buttons={buttons}
      />

      <TableBody data={filteredData} columns={columns} {...props} />
    </Flex>
  )
}
