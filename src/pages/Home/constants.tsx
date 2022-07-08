import { TransactionModel } from '@/contexts'
import { TabsContent } from './components'

export const getTabs = (
  incomeItems: TransactionModel[],
  outcomeItems: TransactionModel[]
) => {
  const getContent = (month?: number) => (
    <TabsContent
      incomeItems={incomeItems}
      outcomeItems={outcomeItems}
      month={month}
    />
  )

  return [
    {
      key: 1,
      label: 'Total',
      content: getContent(),
    },
    {
      key: 2,
      label: 'Este mês',
      content: getContent(new Date().getMonth()),
    },
    {
      key: 3,
      label: 'Mês passado',
      content: getContent(new Date().getMonth() - 1),
    },
  ]
}
