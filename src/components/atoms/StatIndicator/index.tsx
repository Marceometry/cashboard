import { Box, StatArrow } from '@chakra-ui/react'

export type StatIndicatorProps = {
  type: 'income' | 'outcome' | 'balance'
}

const statType = {
  income: 'increase',
  outcome: 'decrease',
} as const

const Balance = () => (
  <Box w='2.5' h='2.5' mr='1' bg='blue.400' rounded='full' />
)

export const StatIndicator = ({ type }: StatIndicatorProps) => {
  return type === 'balance' ? <Balance /> : <StatArrow type={statType[type]} />
}
