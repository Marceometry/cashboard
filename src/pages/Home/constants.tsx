import { Center, StatArrow } from '@chakra-ui/react'

export const tabsContents = [
  {
    earned: {
      value: 9103.7,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 2704.15,
      percentage: 23.36,
    },
  },
  {
    earned: {
      value: 2503,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 407.6,
      percentage: 17.76,
    },
  },
  {
    earned: {
      value: 4678.37,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 1097,
      percentage: 23.36,
    },
  },
]

export const tabsData = [
  {
    label: 'Total',
    content: tabsContents[0],
  },
  {
    label: 'Este mês',
    content: tabsContents[1],
  },
  {
    label: 'Mês passado',
    content: tabsContents[2],
  },
]

export const columns = [
  {
    label: '',
    field: 'isSpent',
    customRender: ({ isSpent }: any) => (
      <Center>
        <StatArrow type={isSpent ? 'decrease' : 'increase'} />
      </Center>
    ),
  },
  {
    label: 'Valor',
    field: 'value',
  },
  {
    label: 'Descrição',
    field: 'description',
  },
  {
    label: 'Data',
    field: 'date',
  },
]

export const data = [
  {
    description: 'Placa de vídeo',
    value: `R$ ${(498.7).toLocaleString()}`,
    date: new Date().toLocaleString(),
    isSpent: true,
  },
  {
    description: 'Memória RAM',
    value: `R$ ${(253.23).toLocaleString()}`,
    date: new Date().toLocaleString(),
    isSpent: true,
  },
  {
    description: 'Pratos hi-hat',
    value: `R$ ${(50).toLocaleString()}`,
    date: new Date().toLocaleString(),
  },
  {
    description: 'Carpete',
    value: `R$ ${(75).toLocaleString()}`,
    date: new Date().toLocaleString(),
    isSpent: true,
  },
  // {
  //   description: 'Mesa de som',
  //   value: `R$ ${(4500).toLocaleString()}`,
  //   date: new Date().toLocaleString(),
  //   isSpent: true,
  // },
  // {
  //   description: 'Ingresso Metallica',
  //   value: `R$ ${(190).toLocaleString()}`,
  //   date: new Date().toLocaleString(),
  // },
  // {
  //   description: 'Ingresso Metallica',
  //   value: `R$ ${(190).toLocaleString()}`,
  //   date: new Date().toLocaleString(),
  // },
  // {
  //   description: 'Ingresso Metallica',
  //   value: `R$ ${(190).toLocaleString()}`,
  //   date: new Date().toLocaleString(),
  // },
  // {
  //   description: 'Ingresso Metallica',
  //   value: `R$ ${(190).toLocaleString()}`,
  //   date: new Date().toLocaleString(),
  // },
]
