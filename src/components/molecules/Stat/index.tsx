import { masks } from '@/utils'
import {
  Stat as ChakraStat,
  StatLabel,
  StatNumber,
  StatArrow,
  Grid,
  Center,
  Box,
} from '@chakra-ui/react'

export type StatProps = {
  label: string
  value: number
  type: 'increase' | 'decrease' | 'balance'
  size?: 'lg' | 'md'
}

const Balance = () => <Box w='2.5' h='2.5' bg='blue.400' rounded='full' />

export const Stat = ({ label, value, type, size = 'lg' }: StatProps) => {
  return (
    <ChakraStat>
      <Grid placeItems='center'>
        <Center gap='2'>
          {type === 'balance' ? <Balance /> : <StatArrow type={type} />}
          <StatLabel fontSize={size === 'lg' ? 'xl' : 'md'}>{label}</StatLabel>
        </Center>
        <StatNumber fontSize={size === 'lg' ? '3xl' : 'lg'} mt='2'>
          {masks.valueToMoney(value)}
        </StatNumber>
      </Grid>
    </ChakraStat>
  )
}
