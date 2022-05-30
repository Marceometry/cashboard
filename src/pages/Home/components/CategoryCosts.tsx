import { Center, GridItem, Heading, Grid } from '@chakra-ui/react'
import { Card, Chart, Table } from '@/components'

const columns = [
  {
    label: 'Categoria',
    field: 'category',
  },
  {
    label: 'Custos',
    field: 'costs',
    customRender: ({ costs }: any) => `R$ ${costs.toLocaleString()}`,
  },
  {
    label: 'Fração',
    field: 'fraction',
    customRender: ({ fraction }: any) => `${fraction}%`,
  },
]

const baseData = [
  {
    name: 'Categoria A',
    value: 400,
  },
  {
    name: 'Categoria B',
    value: 350,
  },
  {
    name: 'Categoria C',
    value: 300,
  },
  {
    name: 'Categoria D',
    value: 200,
  },
  {
    name: 'Categoria E',
    value: 500,
  },
  {
    name: 'Categoria F',
    value: 300,
  },
  {
    name: 'Categoria G',
    value: 100,
  },
]

const total = baseData.reduce((value, item) => {
  return value + item.value
}, 0)

const data = baseData.map((item) => {
  return {
    category: item.name,
    costs: item.value,
    fraction: Math.round((100 * item.value) / total),
  }
})

export const CategoryCosts = () => {
  return (
    <Card>
      <Center>
        <Heading size='lg'>Gastos por categoria</Heading>
      </Center>
      <Grid templateColumns='3fr 2fr' gap='4' flex='1'>
        <GridItem>
          <Center h='full'>
            <Chart data={baseData} />
          </Center>
        </GridItem>
        <GridItem>
          <Center h='full' overflow='auto'>
            <Table size='sm' columns={columns} data={data} />
          </Center>
        </GridItem>
      </Grid>
    </Card>
  )
}
