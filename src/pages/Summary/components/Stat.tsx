import {
  Center,
  Stat as ChakraStat,
  Grid,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { StatIndicator } from '@/components'
import { currency } from '@/utils'

export type StatProps = {
  label: string
  value: number
  type: 'income' | 'outcome' | 'balance'
}

export const Stat = ({ label, value, type }: StatProps) => {
  return (
    <ChakraStat>
      <Grid placeItems='center'>
        <Center gap='2'>
          <StatIndicator type={type} />
          <StatLabel fontSize={{ base: 'md', sm: 'xl' }}>{label}</StatLabel>
        </Center>
        <StatNumber fontSize={{ base: 'lg', sm: '3xl' }} mt='2'>
          {currency.valueToMoney(value)}
        </StatNumber>
      </Grid>
    </ChakraStat>
  )
}
