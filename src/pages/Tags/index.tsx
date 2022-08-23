import { MainTemplate, Table } from '@/components'
import { useTags } from '@/contexts'
import { getColumns } from './constants'

export const Tags = () => {
  const { tagList, isLoading } = useTags()

  const handleOpenTransactions = console.log

  const columns = getColumns(handleOpenTransactions)

  return (
    <MainTemplate>
      <Table columns={columns} data={tagList} isLoading={isLoading} noSearch />
    </MainTemplate>
  )
}
