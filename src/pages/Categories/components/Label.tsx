import { StatArrow, Text } from '@chakra-ui/react'

type Props = {
  isSpent: boolean
}

export const Label = ({ isSpent }: Props) => {
  return (
    <>
      <StatArrow type={isSpent ? 'decrease' : 'increase'} />
      <Text ml='2'>{isSpent ? 'Gastos' : 'Ganhos'} por Categoria</Text>
    </>
  )
}
