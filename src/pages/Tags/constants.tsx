import { Text } from '@chakra-ui/react'
import { ColumnProps } from '@/components'
import { masks } from '@/utils'
import { DataModel } from './types'

export const columns: ColumnProps<DataModel>[] = [
  {
    label: 'Tag',
    field: 'name',
  },
  {
    label: 'Entrada',
    field: 'income',
    customRender: (props) =>
      props.income ? masks.valueToMoney(props.income) : '-',
  },
  {
    label: 'Saída',
    field: 'outcome',
    customRender: (props) =>
      props.outcome ? masks.valueToMoney(props.outcome) : '-',
  },
  {
    label: 'Balanço',
    field: 'balance',
    customRender: (props) => (
      <Text color={props.balance > 0 ? '#48bb78' : '#f56565'}>
        {masks.valueToMoney(props.balance)}
      </Text>
    ),
  },
]
