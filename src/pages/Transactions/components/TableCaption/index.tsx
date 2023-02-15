import { Flex, Stat, StatArrow, Text } from '@chakra-ui/react'
import { currency } from '@/utils'
import { FilterTransactionsFormInputs } from '../../validation'

type TableCaptionProps = {
  filters: FilterTransactionsFormInputs
  values: [number, number]
}

export const TableCaption = ({ filters, values }: TableCaptionProps) => {
  const Balance = () => (
    <Stat>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='increase' />
        <Text fontSize='md'>{currency.valueToMoney(values[0])}</Text>
      </Flex>
      <Flex alignItems='center' gap='1'>
        <StatArrow type='decrease' />
        <Text fontSize='md'>{currency.valueToMoney(values[1])}</Text>
      </Flex>
    </Stat>
  )

  if (!filters) return <Balance />

  const { selectedMonth, selectedYear } = filters
  if (!selectedYear) return <Balance />

  const monthAsNumber = Number(selectedMonth)
  const month = monthAsNumber
    ? monthAsNumber > 9
      ? monthAsNumber
      : `0${monthAsNumber}`
    : null

  return (
    <Flex gap='4'>
      {month ? `${month}/${selectedYear}` : selectedYear}
      <Balance />
    </Flex>
  )
}
