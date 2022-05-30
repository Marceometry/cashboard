import { Box, Divider } from '@chakra-ui/react'
import { Card, Stat, StatProps, Tabs } from '@/components'

type Props = {
  balance: Omit<StatProps, 'label'>
  data?: Array<{
    label: string
    content: Omit<StatProps, 'label'>
  }>
}

const tabsContents = [
  {
    value: 9103.7,
    percentage: 23.36,
    increase: true,
  },
  {
    value: 2503,
    percentage: 23.36,
    increase: true,
  },
  {
    value: 4678.37,
    percentage: 23.36,
    increase: true,
  },
]

const tabsData = [
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

const Page = (props: any) => <Stat label='Total investido' {...props} />

export const Invested = ({ balance, data = tabsData }: Props) => {
  const tabs = data.map((tab) => ({
    label: tab.label,
    content: <Page {...tab.content} />,
  }))

  return (
    <Card>
      <Tabs tabs={tabs} />
      <Divider mt='2' mb='4' />
      <Box p='2'>
        <Stat label='Total em conta' {...balance} />
      </Box>
    </Card>
  )
}
