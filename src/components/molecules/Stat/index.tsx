import {
  Box,
  Center,
  Stat as ChakraStat,
  Grid,
  StatArrow,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { masks } from '@/utils'

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
