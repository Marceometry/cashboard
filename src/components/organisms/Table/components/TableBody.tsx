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
import { TableProps } from '../types'

export const TableBody = ({
  data,
  columns,
  sortBy,
  sortFunction,
  ...props
}: TableProps) => {
  const headerBg = useColorModeValue('gray.300', 'gray.800')
  const rowBg = useColorModeValue('gray.200', 'gray.600')

  const sortedData = sortBy
    ? data.sort((a, b) => b[sortBy] - a[sortBy])
    : sortFunction
    ? sortFunction(data)
    : data

  return (
    <Box overflow='auto' h='100%'>
      <ChakraTable {...props}>
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th bg={headerBg} key={index}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody overflow='auto'>
          {sortedData.map((item, index) => (
            <Tr key={index} bg={rowBg}>
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
