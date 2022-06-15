import { Center, StatArrow } from '@chakra-ui/react'
import { Card, Table } from '@/components'
import { useTransactions } from '@/contexts'

export const RecentTransactions = () => {
  const { transactionList, removeTransaction } = useTransactions()

  const columns = [
    {
      label: '',
      field: 'type',
      customRender: ({ type }: any) => (
        <Center>
          <StatArrow type={type === 'income' ? 'increase' : 'decrease'} />
        </Center>
      ),
    },
    {
      label: 'Valor',
      field: 'amount',
      customRender: ({ amount }: any) => {
        return `R$ ${amount.toLocaleString()}`
      },
    },
    {
      label: 'Descrição',
      field: 'description',
    },
    {
      label: 'Data',
      field: 'date',
      customRender: ({ date }: any) => {
        return new Date(date).toLocaleDateString()
      },
    },
    {
      label: '',
      field: '',
      customRender: (row: any) => {
        return (
          <button type='button' onClick={() => removeTransaction(row)}>
            Excluir
          </button>
        )
      },
    },
  ]

  return (
    <Card>
      <Table
        size='sm'
        caption='Transações Recentes'
        columns={columns}
        data={transactionList}
      />
    </Card>
  )
}
