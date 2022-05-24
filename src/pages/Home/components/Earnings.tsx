import { Center, Divider } from '@chakra-ui/react'
import { Card, Stat, StatProps, Tabs } from '@/components'

type Props = {
  data: Array<{
    label: string
    content: {
      earned: Omit<StatProps, 'label'>
      spent: Omit<StatProps, 'label'>
    }
  }>
}

const Page = ({ earned, spent }: any) => (
  <>
    <Stat label='Adquirido' {...earned} />
    <Center>
      <Divider orientation='vertical' />
    </Center>
    <Stat label='Gasto' isSpent {...spent} />
  </>
)

export const Earnings = ({ data }: Props) => {
  const tabs = data.map((tab) => ({
    label: tab.label,
    content: <Page {...tab.content} />,
  }))

  return (
    <Card>
      <Tabs tabs={tabs} />
    </Card>
  )
}
