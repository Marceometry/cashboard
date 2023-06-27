import { Text, useColorModeValue } from '@chakra-ui/react'
import { currency } from '@/utils'

export type CurrencyProps = {
  type: 'income' | 'outcome'
  amount: number
  fontSize?: 'sm' | 'md'
}

export const Currency = ({ type, amount, fontSize }: CurrencyProps) => {
  const green = useColorModeValue('green.500', 'green.400')
  const red = useColorModeValue('red.400', 'red.300')
  return (
    <Text color={type === 'income' ? green : red} fontSize={fontSize}>
      {currency.valueToMoney(amount)}
    </Text>
  )
}
