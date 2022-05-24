import {
  Table as ChakraTable,
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
  customRender?: (data: any) => JSX.Element
}

type TableProps = {
  caption: string
  columns: Column[]
  data: any[]
}

export const Table = ({ caption, columns, data }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable size='sm'>
        <TableCaption fontSize='large' placement='top' mb='6' mt='0' p='0'>
          {caption}
        </TableCaption>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item[columns[0].field]}>
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
    </TableContainer>
  )
}
