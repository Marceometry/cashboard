import {
  Table as ChakraTable,
  TableProps,
  TableContainer,
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
}

export const Table = ({ caption, columns, data, ...props }: Props) => {
  return (
    <ChakraTable {...props}>
      {caption && (
        <TableCaption fontSize='2xl' placement='top' mb='3' mt='0' p='0'>
          {caption}
        </TableCaption>
      )}
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th bg='gray.800'>{column.label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody overflow='auto'>
        {data.map((item) => (
          <Tr key={item[columns[0].field]} bg='gray.600'>
            {columns.map((column) => {
              if (column.customRender) {
                return <Td>{column.customRender(item)}</Td>
              }
              return <Td>{item[column.field]}</Td>
            })}
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr></Tr>
      </Tfoot>
    </ChakraTable>
  )
}
