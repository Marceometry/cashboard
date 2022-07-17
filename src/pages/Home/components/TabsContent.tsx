import { Flex } from '@chakra-ui/react'
import { isThisMonth, isThisYear } from 'date-fns'
import { TransactionModel } from '@/contexts'
import { Stat } from '@/components'
import { DateFilter } from '../constants'

type Props = {
  incomeItems: TransactionModel[]
  outcomeItems: TransactionModel[]
  filter?: DateFilter
}

const getAmountByDate = (array: TransactionModel[], filter?: DateFilter) => {
  const filtered = array.filter((item) => {
    const date = new Date(item.date)
    return filter === 'month'
      ? isThisMonth(date)
      : filter === 'year'
      ? isThisYear(date)
      : true
  })
  return filtered.reduce((acc, item) => acc + item.amount, 0)
}

export const TabsContent = ({ incomeItems, outcomeItems, filter }: Props) => {
  const totalIncome = getAmountByDate(incomeItems, filter)
  const totalOutcome = getAmountByDate(outcomeItems, filter)

  return (
    <Flex flex='1' gap='6' direction='column'>
      <Flex flex='1'>
        <Stat label='Ganhos totais' value={totalIncome} increase />
        <Stat label='Gastos totais' value={totalOutcome} />
      </Flex>
    </Flex>
  )
}
