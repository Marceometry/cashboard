import { Card, MainTemplate, Tabs } from '@/components'
import { TransactionModel, useTransactions } from '@/contexts'
import { getTabs } from './constants'

export const Home = () => {
  const { transactionList } = useTransactions()

  const [incomeItems, outcomeItems] = transactionList.reduce(
    (acc, item) => {
      const index = item.type === 'income' ? 0 : 1
      const value = [...acc[index], item]
      return acc.fill(value, index)
    },
    [[], []] as TransactionModel[][]
  )

  const tabs = getTabs(incomeItems, outcomeItems)

  return (
    <MainTemplate>
      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </MainTemplate>
  )
}
