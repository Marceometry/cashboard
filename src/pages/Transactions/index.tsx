import { Flex } from '@chakra-ui/react'
import { Sidebar, Table, Header, FloatButton, Card } from '@/components'
import { useTransactions } from '@/contexts'
import { getColumns } from './constants'

export const Transactions = () => {
  const { transactionList, removeTransaction } = useTransactions()

  const columns = getColumns({ handleDelete: removeTransaction })

  return (
    <Flex h='100vh'>
      <Sidebar />
      <Flex direction='column' w='full' flex='1' p='6' gap='6'>
        <Header />

        <Card>
          <Table
            caption='Transações'
            columns={columns}
            data={transactionList}
          />
        </Card>

        <FloatButton />
      </Flex>
    </Flex>
  )
}
