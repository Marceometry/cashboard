import { Flex } from '@chakra-ui/react'
import { isThisYear } from 'date-fns'
import { TransactionModel } from '@/contexts'
import { Stat } from '@/components'

type Props = {
  incomeItems: TransactionModel[]
  outcomeItems: TransactionModel[]
  month?: number
}

const getAmountByDate = (array: TransactionModel[], month?: number) => {
  const filtered = array.filter(({ date }) => {
    if (month !== 0 && !month) return true
    const sameMonth = new Date(date).getMonth() === month
    const thisYear = isThisYear(new Date(date))
    return sameMonth && thisYear
  })
  return filtered.reduce((acc, item) => acc + item.amount, 0)
}

export const TabsContent = ({ incomeItems, outcomeItems, month }: Props) => {
  const totalIncome = getAmountByDate(incomeItems, month)
  const totalOutcome = getAmountByDate(outcomeItems, month)

  return (
    <Flex flex='1' gap='6' direction='column'>
      <Flex flex='1'>
        <Stat label='Ganhos totais' value={totalIncome} increase />
        <Stat label='Gastos totais' value={totalOutcome} />
      </Flex>
    </Flex>
  )
}
