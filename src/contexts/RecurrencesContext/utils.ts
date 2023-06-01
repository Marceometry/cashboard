import {
  addMonths,
  differenceInCalendarMonths,
  isFuture,
  isThisMonth,
  subMonths,
} from 'date-fns'
import { AddTransactionModel, TransactionModel } from '@/contexts'
import { FirebaseDataSnapshot } from '@/hooks'
import { sortByDate } from '@/utils'
import {
  RecurrentTransaction,
  UpdateRecurrenceTransactionListArgs,
} from './types'

export const firebaseDataSnapshotToRecurrenceList = (
  data: FirebaseDataSnapshot<RecurrentTransaction>
) => {
  return Object.entries(data).map(([id, values]) => ({
    ...values,
    transactions: values.transactions || [],
    id,
  }))
}

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

export const checkRecurrences = async ({
  recurrenceList,
  addTransaction,
  updateRecurrenceTransactionList,
}: CheckRecurrencesProps) => {
  const recurrencesToUpdate: UpdateRecurrenceTransactionListArgs[] = []

  // return recurrenceList.forEach((item) => {
  //   const transactions = item.transactions.filter(
  //     (t) => !isThisMonth(new Date(t.date))
  //   )
  //   updateRecurrenceTransactionList({
  //     id: item.id,
  //     transactions,
  //     isActive: item.isActive,
  //   })
  // })

  const check = async (
    item: RecurrentTransaction,
    resolve: (value?: unknown) => void
  ) => {
    let isActive = item.isActive
    if (!isActive) return resolve()

    const startDate = new Date(item.startDate)
    if (isFuture(startDate) && !isThisMonth(startDate)) return

    const { installments } = item
    const transactions = item.transactions
    const monthsPassed = differenceInCalendarMonths(new Date(), startDate)

    if (transactions.length - 1 === monthsPassed) return

    const latestTransactionDate = transactions.length
      ? new Date(sortByDate(transactions)[0].date)
      : subMonths(startDate, 1)

    for (let i = 1; transactions.length - 1 !== monthsPassed; i++) {
      if (installments && transactions.length === installments) {
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

      if (installments && transactions.length === installments) {
        isActive = false
      }
    }

    recurrencesToUpdate.push({ id: item.id, transactions, isActive })
    resolve()
  }

  const promises = recurrenceList.map(
    (item) => new Promise((resolve) => check(item, resolve))
  )
  await Promise.all(promises)

  recurrencesToUpdate.forEach((item) => updateRecurrenceTransactionList(item))
}
