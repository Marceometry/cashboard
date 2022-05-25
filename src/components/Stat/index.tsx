import {
  Stat as ChakraStat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
} from '@chakra-ui/react'

export type StatProps = {
  label: string
  value: number
  percentage: number
  increase?: boolean
  isSpent?: boolean
}

export const Stat = ({
  label,
  value,
  percentage,
  increase,
  isSpent,
}: StatProps) => {
  return (
    <ChakraStat>
      <Grid placeItems='center'>
        <StatLabel fontSize='2xl'>{label}</StatLabel>
        <StatNumber fontSize='4xl' my='2'>
          R$ {value.toLocaleString()}
        </StatNumber>
        <StatHelpText fontSize='lg' mb='0'>
          <StatArrow
            type={increase ? 'increase' : 'decrease'}
            transform={isSpent ? 'rotate(180deg)' : ''}
          />
          {percentage}%
        </StatHelpText>
      </Grid>
    </ChakraStat>
  )
}
