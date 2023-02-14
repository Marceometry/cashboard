import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { Stat } from '@/components'
import { TransactionType } from '@/contexts'
import { ChartData } from '../constants'

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
          type='increase'
          label='Ganhos totais'
          value={totalIncome}
          size={isSmallScreen ? 'md' : 'lg'}
        />
        <Stat
          type='decrease'
          label='Gastos totais'
          value={totalOutcome}
          size={isSmallScreen ? 'md' : 'lg'}
        />
        <Stat
          type='balance'
          label='Total economizado'
          value={totalBalance}
          size={isSmallScreen ? 'md' : 'lg'}
        />
      </Flex>
    </Flex>
  )
}
