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
  isSmallScreen?: boolean
}

export const Stat = ({ label, value, type, isSmallScreen }: StatProps) => {
  return (
    <ChakraStat>
      <Grid placeItems='center'>
        <Center gap='2'>
          <StatIndicator type={type} />
          <StatLabel fontSize={isSmallScreen ? 'md' : 'xl'}>{label}</StatLabel>
        </Center>
        <StatNumber fontSize={isSmallScreen ? 'lg' : '3xl'} mt='2'>
          {currency.valueToMoney(value)}
        </StatNumber>
      </Grid>
    </ChakraStat>
  )
}
