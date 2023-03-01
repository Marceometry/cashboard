import { TransactionModel, useTransactions } from '@/contexts'
import { useApiCall } from '@/hooks'
import { sortByDate } from '@/utils'

export const useTags = () => {
  const { call } = useApiCall()
  const { transactionList, updateTransactionList, updateTransaction } =
    useTransactions()

  const deleteTag = call(
    (tagToDelete: string) => {
      const transactions = transactionList
        .filter((item) => item.tags?.find((tag) => tag === tagToDelete))
        .map((item) => ({
          ...item,
          tags: item.tags?.filter((tag) => tag !== tagToDelete),
        }))
      updateTransactionList(transactions)
    },
    { toastText: 'Tag excluída com sucesso!' }
  )

  const transactionsByTag = (selectedTag: string) => {
    return sortByDate(transactionList).filter((item) =>
      item.tags?.find((tag: string) => tag === selectedTag)
    )
  }

  const removeTagFromTransaction = (
    id: string,
    selectedTag: string,
    transactions: TransactionModel[]
  ) => {
    const transaction = transactions.find((item) => item.id === id)
    if (!transaction) return
    updateTransaction({
      ...transaction,
      tags: transaction?.tags?.filter((tag) => tag !== selectedTag),
    })
  }

  return { deleteTag, transactionsByTag, removeTagFromTransaction }
}
