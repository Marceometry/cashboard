import { Flex, Stat, StatArrow, Text } from '@chakra-ui/react'
import { masks } from '@/utils'
import { FilterModel } from '../../types'

type TableCaptionProps = {
  filters: FilterModel
  values: [number, number]
}

export const TableCaption = ({ filters, values }: TableCaptionProps) => {
  const Balance = () => (
    <Stat>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='increase' />
        <Text fontSize='md'>{masks.valueToMoney(values[0])}</Text>
      </Flex>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='decrease' />
        <Text fontSize='md'>{masks.valueToMoney(values[1])}</Text>
      </Flex>
    </Stat>
  )

  if (!filters) return <Balance />

  const { selectedMonth, selectedYear } = filters
  if (!selectedYear) return <Balance />

  const month = selectedMonth
    ? selectedMonth > 9
      ? selectedMonth
      : `0${selectedMonth}`
    : null

  return (
    <Flex gap='4'>
      {month ? `${month}/${selectedYear}` : selectedYear}
      <Balance />
    </Flex>
  )
}
