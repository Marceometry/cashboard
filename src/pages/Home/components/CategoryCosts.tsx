import {
  Center,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  GridItem,
  Heading,
  Grid,
} from '@chakra-ui/react'
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

const data = [
  {
    category: 'Categoria A',
    costs: 400,
    fraction: 30,
  },
  {
    category: 'Categoria B',
    costs: 350,
    fraction: 26,
  },
  {
    category: 'Categoria C',
    costs: 300,
    fraction: 22,
  },
  {
    category: 'Categoria D',
    costs: 200,
    fraction: 15,
  },
  {
    category: 'Categoria E',
    costs: 100,
    fraction: 7,
  },
]

export const CategoryCosts = () => {
  return (
    <Card>
      <Center>
        <Heading size='lg'>Gastos por categoria</Heading>
      </Center>
      <Grid templateColumns='3fr 2fr' gap='4' h='full'>
        <GridItem>
          <Center h='full'>
            <Chart />
          </Center>
        </GridItem>
        <GridItem>
          <Center h='full'>
            <Table columns={columns} data={data} />
          </Center>
        </GridItem>
      </Grid>
    </Card>
  )
}
