import { useEffect, useRef, useState } from 'react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTransactions } from '@/contexts'
import { useInfiniteScroll } from '@/hooks'
import { dynamicSort } from '@/utils'
import { TableProps } from '../types'

export const TableBody = ({ data, columns, sortBy, ...props }: TableProps) => {
  const { dateParam } = useTransactions()
  const containerRef = useRef<HTMLDivElement>(null)
  const [reverseSort, setReverseSort] = useState(false)
  const [selectedSortBy, setSelectedSortBy] = useState<any>(sortBy || dateParam)

  const sortedData = selectedSortBy
    ? data.sort((a, b) =>
        dynamicSort(a[selectedSortBy], b[selectedSortBy], reverseSort)
      )
    : data

  const { lastElementRef, paginatedData } = useInfiniteScroll(sortedData)

  const headerBgAndBorder = useColorModeValue('gray.300', 'gray.800')

  function selectSortBy(field: any) {
    if (selectedSortBy === field) {
      setReverseSort((state) => !state)
    } else {
      setSelectedSortBy(field)
      setReverseSort(false)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({ top: 0 })
  }, [sortedData])

  useEffect(() => {
    setSelectedSortBy(sortBy)
  }, [sortBy])

  return (
    <Box ref={containerRef} overflow='auto' h='100%'>
      <ChakraTable
        {...props}
        size={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}
      >
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th bg={headerBgAndBorder} key={index}>
                {column.label ? (
                  <Button
                    __css={{ all: 'unset', cursor: 'pointer' }}
                    variant='unstyled'
                    gap='1'
                    display='flex'
                    alignItems='center'
                    onClick={() => selectSortBy(column.field)}
                  >
                    {column.label}
                    {selectedSortBy === column.field ? (
                      reverseSort ? (
                        <TriangleUpIcon fontSize={12} />
                      ) : (
                        <TriangleDownIcon fontSize={12} />
                      )
                    ) : (
                      ''
                    )}
                  </Button>
                ) : (
                  column.label
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr ref={(node) => lastElementRef(node, index)} key={index}>
              {columns.map((column, columnIndex) => (
                <Td key={columnIndex} borderColor={headerBgAndBorder}>
                  {column.customRender
                    ? column.customRender(item)
                    : column.field
                    ? item[column.field]
                    : ''}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Box>
  )
}
