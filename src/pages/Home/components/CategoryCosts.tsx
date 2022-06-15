import { Center, GridItem, Heading, Grid } from '@chakra-ui/react'
import { Card, Chart, Table } from '@/components'
import { useTransactions } from '@/contexts'

const columns = [
  {
    label: 'Categoria',
    field: 'name',
  },
  {
    label: 'Custos',
    field: 'outcome',
    customRender: ({ outcome }: any) => `R$ ${outcome.toLocaleString()}`,
  },
  {
    label: 'Fração',
    field: 'fraction',
    customRender: ({ fraction }: any) => `${fraction}%`,
  },
]

export const CategoryCosts = () => {
  const { categoryList } = useTransactions()

  const total = categoryList.reduce((value, item) => {
    return value + item.outcome
  }, 0)

  const data = categoryList.map((item) => {
    return {
      name: item.name,
      outcome: item.outcome,
      fraction: Math.round((100 * item.outcome) / total),
    }
  })

  const chartData = categoryList.map((item) => {
    return { name: item.name, value: item.outcome }
  })

  return (
    <Card>
      <Center>
        <Heading size='lg'>Gastos por categoria</Heading>
      </Center>
      <Grid templateColumns='3fr 2fr' gap='4' flex='1'>
        <GridItem>
          <Center h='full'>
            <Chart data={chartData} />
          </Center>
        </GridItem>
        <GridItem>
          <Center h='full' overflow='auto'>
            <Table size='sm' sortBy='outcome' columns={columns} data={data} />
          </Center>
        </GridItem>
      </Grid>
    </Card>
  )
}
