import { useEffect, useRef } from 'react'
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { useInfiniteScroll } from '@/hooks'
import { TableProps } from '../types'

export const TableBody = ({
  data,
  columns,
  sortBy,
  sortFunction,
  ...props
}: TableProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const sortedData = sortBy
    ? data.sort((a, b) => b[sortBy] - a[sortBy])
    : sortFunction
    ? sortFunction(data)
    : data

  const { lastElementRef, paginatedData } = useInfiniteScroll(sortedData)

  const headerBgAndBorder = useColorModeValue('gray.300', 'gray.800')

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({ top: 0 })
  }, [sortedData])

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
                {column.label}
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
                    : item[column.field]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr></Tr>
        </Tfoot>
      </ChakraTable>
    </Box>
  )
}
