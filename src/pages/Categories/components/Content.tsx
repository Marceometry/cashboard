import { Flex } from '@chakra-ui/react'
import { Table } from '@/components'
import { TransactionType } from '@/contexts'
import { getColumns } from '../constants'

type Props = {
  data: any[]
  type: TransactionType
  handleChartView: () => void
}

export const Content = ({ data, type, handleChartView }: Props) => {
  const columns = getColumns(type)
  const buttons = {
    textButtons: [{ children: 'Mostrar Gráfico', onClick: handleChartView }],
  }

  return (
    <Flex h='full' w='full' direction='column' justifyContent='center'>
      <Table
        mx='auto'
        sortBy='outcome'
        columns={columns}
        buttons={buttons}
        data={data}
        noSearch
      />
    </Flex>
  )
}
