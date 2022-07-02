import {
  Table as ChakraTable,
  TableProps,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react'

type Column = {
  label: string
  field: string
  customRender?: (data: any) => JSX.Element | string
}

type Props = TableProps & {
  data: any[]
  columns: Column[]
  caption?: string
  sortBy?: string
}

export const Table = ({ caption, columns, data, sortBy, ...props }: Props) => {
  const sortedData = sortBy ? data.sort((a, b) => b[sortBy] - a[sortBy]) : data

  return (
    <ChakraTable {...props}>
      {caption && (
        <TableCaption fontSize='3xl' placement='top' mb='4' mt='0' p='0'>
          {caption}
        </TableCaption>
      )}
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
