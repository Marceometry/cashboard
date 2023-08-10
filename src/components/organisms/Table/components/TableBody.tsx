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
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTransactions } from '@/contexts'
import { useInfiniteScroll } from '@/hooks'
import { dynamicSort } from '@/utils'
import { TableProps } from '../types'
import { MobileTableBody } from './MobileTableBody'

export const TableBody = ({
  data,
  columns,
  sortBy,
  mobileCard: mobileCard,
  ...props
}: TableProps) => {
  const { dateParam } = useTransactions()
  const headerBg = useColorModeValue('gray.100', 'whiteAlpha.200')
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const containerRef = useRef<HTMLDivElement>(null)
  const [reverseSort, setReverseSort] = useState(false)
  const [selectedSortBy, setSelectedSortBy] = useState<any>(sortBy || dateParam)

  const sortedData = selectedSortBy
    ? data.sort((a, b) =>
        dynamicSort(a[selectedSortBy], b[selectedSortBy], reverseSort)
      )
    : data

  const { lastElementRef, paginatedData } = useInfiniteScroll(sortedData)

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
    if (columns.some((column) => column.field === selectedSortBy)) return
    setSelectedSortBy(sortBy || dateParam)
  }, [sortBy, dateParam, selectedSortBy])

  return isSmallScreen && mobileCard ? (
    <MobileTableBody
      selectedSortBy={selectedSortBy}
      setSelectedSortBy={setSelectedSortBy}
      reverseSort={reverseSort}
      setReverseSort={setReverseSort}
      columns={columns}
      paginatedData={paginatedData}
      lastElementRef={lastElementRef}
      mobileCard={mobileCard}
    />
  ) : (
    <Box ref={containerRef} overflow='auto' h='100%'>
      <ChakraTable
        {...props}
        size={props.size || { base: 'sm', sm: 'sm', md: 'md', lg: 'lg' }}
      >
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th bg={headerBg} key={index}>
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
                <Td key={columnIndex} borderColor='whiteAlpha.200'>
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
