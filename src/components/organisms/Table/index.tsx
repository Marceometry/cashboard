import {
  Table as ChakraTable,
  TableProps,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react'
import { Select } from '@/components/atoms'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { useEffect, useMemo, useState } from 'react'
import { getMonth, getYear } from 'date-fns'
import { filterByMonth, filterByText, filterByYear } from './utils'

export type ColumnProps = {
  label: string
  field: string
  customRender?: (data: any) => JSX.Element | string
}

export type ButtonProps = {
  children: string
  onClick: () => void
  variant?: 'outline' | 'ghost' | 'link' | 'solid' | 'unstyled'
}

type Props = TableProps & {
  data: any[]
  columns: ColumnProps[]
  buttons?: ButtonProps[]
  caption?: string
  sortBy?: string
  noFilters?: boolean
}

export const Table = ({
  caption,
  columns,
  buttons,
  data,
  sortBy,
  noFilters,
  ...props
}: Props) => {
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1)
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()))
  const [searchText, setSearchText] = useState('')

  const sortedData = useMemo(
    () =>
      sortBy
        ? filteredData.sort((a, b) => b[sortBy] - a[sortBy])
        : filteredData,
    [sortBy, filteredData]
  )

  useEffect(() => {
    let filtered = [...data]

    if (!noFilters) {
      filtered = filterByText(filtered, columns, searchText)
      filtered = filterByMonth(filtered, selectedMonth)
      filtered = filterByYear(filtered, selectedYear)
    }

    setFilteredData(filtered)
  }, [data, searchText, selectedMonth, selectedYear])

  return (
    <div>
      <Flex justifyContent='space-between' mb='4'>
        {caption && <Heading fontSize='3xl'>{caption}</Heading>}
        {!noFilters && (
          <Flex gap='4'>
            <Select
              w='auto'
              options={MONTH_LIST}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            />
            <Select
              w='auto'
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              options={YEAR_LIST.map((item) => ({ label: item, value: item }))}
            />
            <Input
              w='auto'
              placeholder='Pesquisar'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {buttons?.map((button) => (
              <Button key={button.children} {...button} />
            ))}
          </Flex>
        )}
      </Flex>
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
    </div>
  )
}
