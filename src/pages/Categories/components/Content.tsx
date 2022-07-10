import { Flex } from '@chakra-ui/react'
import { Table } from '@/components'
import { TransactionType } from '@/contexts'
import { getColumns } from '../constants'

type Props = {
  data: any[]
  type: TransactionType
}

export const Content = ({ data, type }: Props) => {
  const columns = getColumns(type)

  return (
    <Flex h='full' w='full' direction='column' justifyContent='center'>
      <Table
        mx='auto'
        sortBy='outcome'
        columns={columns}
        data={data}
        noSearch
      />
    </Flex>
  )
}
