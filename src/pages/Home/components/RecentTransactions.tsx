import { Card, Table } from '@/components'
import { Center, Heading } from '@chakra-ui/react'
import { columns, data } from '../constants'

export const RecentTransactions = () => {
  return (
    <Card>
      <Table
        size='sm'
        caption='Transações Recentes'
        columns={columns}
        data={data}
      />
    </Card>
  )
}
