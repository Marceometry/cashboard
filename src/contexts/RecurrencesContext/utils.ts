import {
  addMonths,
  differenceInCalendarMonths,
  isFuture,
  isThisMonth,
  subMonths,
} from 'date-fns'
import { FirebaseDataSnapshot } from '@/hooks'
import {
  AddTransactionModel,
  RecurrentTransaction,
  TransactionModel,
} from '@/types'
import { sortByDate } from '@/utils'
import { UpdateRecurrenceTransactionListArgs } from './types'

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
    const startDate = new Date(item.startDate)
    if (isFuture(startDate) && !isThisMonth(startDate)) return resolve()

    const { installments } = item
    const monthsPassed = differenceInCalendarMonths(new Date(), startDate)

    if (item.transactions.length - 1 === monthsPassed) return resolve()

    const latestTransactionDate = item.transactions.length
      ? new Date(sortByDate(item.transactions)[0].date)
      : subMonths(startDate, 1)

    let isActive = item.isActive
    if (!isActive) {
      const { installments, transactions } = item
      if (installments && transactions.length >= installments) return resolve()

      const date = addMonths(latestTransactionDate, 1).toISOString()
      recurrencesToUpdate.push({
        id: item.id,
        transactions: [...transactions, { id: '', date }],
        isActive: false,
      })
      return resolve()
    }

    const transactions = item.transactions.filter((t) => !!t.id)
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

      const { id } = await addTransaction({
        ...item,
        description,
        date,
        datePayed: date,
      })
      transactions.push({ id, date })

      if (installments && transactions.length >= installments) {
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
