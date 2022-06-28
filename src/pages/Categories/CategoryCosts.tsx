import { Heading, Flex } from '@chakra-ui/react'
import { Card, Chart, Table } from '@/components'
import { useTransactions } from '@/contexts'
import { columns } from './constants'

export const CategoryCosts = () => {
  const { categoryList } = useTransactions()

  const orderedList = [...categoryList.sort((a, b) => b.outcome - a.outcome)]

  const topOnes = orderedList.splice(0, 5)
  const bottomOnes = orderedList.slice(5)

  console.log({ topOnes, bottomOnes })

  const total = topOnes.reduce((value, item) => {
    return value + item.outcome
  }, 0)

  const data = topOnes.map((item) => {
    return {
      name: item.name,
      outcome: item.outcome,
      fraction: Math.round((100 * item.outcome) / total),
    }
  })

  const chartData = topOnes.map((item) => {
    return { name: item.name, value: item.outcome }
  })

  return (
    <Card>
      <Flex h='full' direction='column' justifyContent='center'>
        <Flex direction='column' alignItems='center' gap='5'>
          <Heading size='lg'>Gastos por categoria</Heading>
          <Table mx='auto' sortBy='outcome' columns={columns} data={data} />
        </Flex>
        <Chart data={chartData} />
      </Flex>
    </Card>
  )
}
