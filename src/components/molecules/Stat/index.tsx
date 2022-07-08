import {
  Stat as ChakraStat,
  StatLabel,
  StatNumber,
  StatArrow,
  Grid,
  Center,
} from '@chakra-ui/react'

export type StatProps = {
  label: string
  value: number
  increase?: boolean
}

export const Stat = ({ label, value, increase }: StatProps) => {
  return (
    <ChakraStat>
      <Grid placeItems='center'>
        <Center gap='2'>
          <StatArrow type={increase ? 'increase' : 'decrease'} />
          <StatLabel fontSize='xl'>{label}</StatLabel>
        </Center>
        <StatNumber fontSize='3xl' my='2'>
          R$ {value.toLocaleString()}
        </StatNumber>
      </Grid>
    </ChakraStat>
  )
}
