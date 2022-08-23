import { MainTemplate, Table } from '@/components'
import { useTags } from '@/contexts'
import { columns } from './constants'

export const Tags = () => {
  const { tagList } = useTags()

  return (
    <MainTemplate>
      <Table columns={columns} data={tagList} noSearch />
    </MainTemplate>
  )
}
