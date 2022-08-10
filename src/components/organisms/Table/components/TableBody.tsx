import { useInfiniteScroll } from '@/hooks'
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
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

  const headerBg = useColorModeValue('gray.300', 'gray.800')
  const rowBg = useColorModeValue('gray.200', 'gray.600')

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
              <Th bg={headerBg} key={index}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((item, index) => (
            <Tr
              ref={(node) => lastElementRef(node, index)}
              key={index}
              bg={rowBg}
            >
              {columns.map((column, columnIndex) => (
                <Td key={columnIndex}>
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
