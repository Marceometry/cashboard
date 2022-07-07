import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react'
import { TableProps } from '../types'

export const TableBody = ({ data, columns, sortBy, ...props }: TableProps) => {
  const sortedData = sortBy ? data.sort((a, b) => b[sortBy] - a[sortBy]) : data

  return (
    <ChakraTable {...props}>
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th bg='gray.800' key={index}>
              {column.label}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody overflow='auto'>
        {sortedData.map((item, index) => (
          <Tr key={index} bg='gray.600'>
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
  )
}
