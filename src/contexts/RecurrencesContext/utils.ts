import { addMonths, differenceInMonths, isFuture } from 'date-fns'
import { AddTransactionModel, TransactionModel } from '@/contexts'
import { sortByDate } from '@/utils'
import {
  RecurrentTransaction,
  UpdateRecurrenceTransactionListArgs,
} from './types'

export const getDescriptionWithInstallments = (
  description: string,
  currentInstallment: number,
  installments: number | null
) => {
  return installments
    ? `${description} (${currentInstallment}/${installments})`
    : description
}

type CheckRecurrencesProps = {
  recurrenceList: RecurrentTransaction[]
  addTransaction: (args: AddTransactionModel) => Promise<TransactionModel>
  updateRecurrenceTransactionList: (
    args: UpdateRecurrenceTransactionListArgs
  ) => Promise<void>
}

export const checkRecurrences = ({
  addTransaction,
  recurrenceList,
  updateRecurrenceTransactionList,
}: CheckRecurrencesProps) => {
  recurrenceList.forEach(async (item) => {
    let isActive = item.isActive
    if (!isActive) return

    const startDate = new Date(item.startDate)
    if (isFuture(startDate)) return

    const { installments } = item
    const transactions = item.transactions
    const monthsPassed = differenceInMonths(new Date(), startDate)

    if (transactions.length - 1 === monthsPassed) return

    const latestTransactionDate = transactions.length
      ? new Date(sortByDate(transactions)[0].date)
      : startDate

    for (let i = 0; transactions.length - 1 !== monthsPassed; i++) {
      if (installments && transactions.length >= installments) {
        isActive = false
        break
      }

      const date = addMonths(latestTransactionDate, i).toISOString()
      const description = getDescriptionWithInstallments(
        item.description,
        transactions.length + 1,
        installments
      )

      const { id } = await addTransaction({ ...item, description, date })
      transactions.push({ id, date })
    }

    updateRecurrenceTransactionList({ id: item.id, transactions, isActive })
  })
}
