import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { TransactionType } from '@/contexts'
import { Stat } from './Stat'
import { ChartData } from '../../constants'

type Props = {
  data: ChartData
}

const getAmountByType = (array: ChartData, type: TransactionType) => {
  return array.reduce((acc, item) => acc + item[type], 0)
}

export const TabsContent = ({ data }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false })

  const totalIncome = getAmountByType(data, 'income')
  const totalOutcome = getAmountByType(data, 'outcome')
  const totalBalance = totalIncome - totalOutcome

  return (
    <Flex flex='1' gap='6' direction='column'>
      <Flex
        flex='1'
        direction={isSmallScreen ? 'column' : 'row'}
        gap={isSmallScreen ? '4' : ''}
      >
        <Stat
          type='income'
          label='Ganhos totais'
          value={totalIncome}
          isSmallScreen={isSmallScreen}
        />
        <Stat
          type='outcome'
          label='Gastos totais'
          value={totalOutcome}
          isSmallScreen={isSmallScreen}
        />
        <Stat
          type='balance'
          label='Total economizado'
          value={totalBalance}
          isSmallScreen={isSmallScreen}
        />
      </Flex>
    </Flex>
  )
}
