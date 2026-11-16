import {
  addMonths,
  differenceInCalendarMonths,
  isSameDay,
  isValid,
  subMonths,
} from 'date-fns'
import { v4 as uuid, validate } from 'uuid'
import { FirebaseDataSnapshot } from '@/hooks'
import {
  AddTransactionModel,
  PaymentMethods,
  RecurrentTransaction,
  TransactionModel,
} from '@/types'
import { sortByDate } from '@/utils'
import { UpdateRecurrenceTransactionListArgs } from './types'

const RECURRENCE_MONTHS_AHEAD = 3

export const firebaseDataSnapshotToRecurrenceList = (
  data: FirebaseDataSnapshot<RecurrentTransaction>
) => {
  return Object.entries(data).map(([id, values]) => ({
    ...values,
    transactions: Object.values(values.transactions || {}).filter(Boolean),
    id,
  }))
}

export const recurrenceListToFirebaseDataSnapshot = (
  data: RecurrentTransaction[]
) => {
  return data.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {} as { [key: string]: RecurrentTransaction })
}

const error = () => {
  throw new Error()
}

export const isRecurrenceInvalid = (item: RecurrentTransaction) => {
  try {
    if (item.id && !validate(item.id)) error()
    if (!item.description) error()
    if (typeof item.category !== 'string') error()
    if (item.type !== 'income' && item.type !== 'outcome') error()
    if (!PaymentMethods[item.paymentMethod]) error()
    if (!isValid(new Date(item.startDate))) error()
    if (isNaN(item.amount)) error()
    if (item.installments && isNaN(item.installments)) error()
    if (item.isActive && typeof item.isActive !== 'boolean') error()
    if (item.transactions.length) {
      item.transactions.forEach((t) => {
        if (t.id && !validate(t.id)) error()
        if (!isValid(new Date(t.date))) error()
      })
    }

    return false
  } catch (error) {
    return true
  }
}

export const isRecurrenceListInvalid = (list: RecurrentTransaction[]) => {
  try {
    if (!list) error()

    const isSomeInvalid = list.some((item: any) => {
      return isRecurrenceInvalid(item)
    })
    if (isSomeInvalid) error()

    const ids = list.map((i) => i.id || uuid())
    const hasDuplicateId = new Set(ids).size !== ids.length
    if (hasDuplicateId) error()

    return false
  } catch (error) {
    return true
  }
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
  transactionList: TransactionModel[]
  addTransaction: (args: AddTransactionModel) => Promise<TransactionModel>
  updateRecurrenceTransactionList: (
    args: UpdateRecurrenceTransactionListArgs
  ) => Promise<void>
  resolve: () => void
}

export const checkRecurrences = async ({
  recurrenceList,
  transactionList,
  addTransaction,
  updateRecurrenceTransactionList,
  resolve,
}: CheckRecurrencesProps) => {
  const recurrencesToUpdate: UpdateRecurrenceTransactionListArgs[] = []
  const recurrenceLimitDate = addMonths(new Date(), RECURRENCE_MONTHS_AHEAD)
  const isAfterRecurrenceLimit = (date: Date) =>
    differenceInCalendarMonths(date, recurrenceLimitDate) > 0

  const transactionsObject = transactionList.reduce(
    (acc: { [key: string]: TransactionModel }, item) => {
      acc[item.id] = item
      return acc
    },
    {}
  )

  const check = async (
    item: RecurrentTransaction,
    resolve: (value?: unknown) => void
  ) => {
    let transactionsChanged = false
    const startDate = new Date(item.startDate)
    if (isAfterRecurrenceLimit(startDate)) return resolve()

    const correctedTransactions = item.transactions.map((i) => {
      const transaction = transactionsObject[i.id]
      if (
        !!i.id &&
        (!transaction ||
          !isSameDay(new Date(transaction?.date), new Date(i.date)))
      ) {
        transactionsChanged = true
      }
      return {
        id: transaction?.id || '',
        date: transaction?.date || i.date,
      }
    })

    const monthsPassed = differenceInCalendarMonths(
      recurrenceLimitDate,
      startDate
    )
    const transactionsByDate = sortByDate(correctedTransactions)
    const datesLacking = transactionsByDate.reduce((acc, t, index, array) => {
      if (index === 0) return acc

      const currentDate = new Date(t.date)
      const lastDate = new Date(array[index - 1].date)
      const difference = differenceInCalendarMonths(lastDate, currentDate)
      if (difference > 1) {
        const dates = new Array(difference - 1)
          .fill('')
          .map((_, index) => subMonths(lastDate, index + 1))
          .filter((date) => !isAfterRecurrenceLimit(date))
          .map((date) => date.toISOString())
        return [...acc, ...dates]
      }

      return acc
    }, [] as string[])

    if (
      !datesLacking.length &&
      correctedTransactions.length - 1 >= monthsPassed
    ) {
      if (transactionsChanged) {
        recurrencesToUpdate.push({
          ...item,
          transactions: correctedTransactions,
        })
      }
      return resolve()
    }

    const latestTransactionDate = correctedTransactions.length
      ? new Date(transactionsByDate[0].date)
      : subMonths(startDate, 1)

    const { installments } = item
    let isActive = item.isActive
    if (!isActive) {
      if (installments && correctedTransactions.length >= installments) {
        if (transactionsChanged) {
          recurrencesToUpdate.push({
            ...item,
            transactions: correctedTransactions,
          })
        }
        return resolve()
      }

      const emptyDates = [...datesLacking]
      for (
        let i = 1;
        correctedTransactions.length + emptyDates.length - 1 < monthsPassed;
        i++
      ) {
        const date = addMonths(latestTransactionDate, i)
        if (isAfterRecurrenceLimit(date)) break
        emptyDates.push(date.toISOString())
      }
      if (installments) {
        emptyDates.splice(installments - correctedTransactions.length)
      }

      if (emptyDates.length || transactionsChanged) {
        recurrencesToUpdate.push({
          id: item.id,
          transactions: [
            ...correctedTransactions,
            ...emptyDates.map((date) => ({ id: '', date })),
          ],
          isActive: false,
        })
      }
      return resolve()
    }

    const transactions = correctedTransactions
    const validTransactions = transactions.filter((t) => !!t.id)
    const initialLength = transactions.length
    let monthsAfterLatest = 0
    while (transactions.length - 1 < monthsPassed || !!datesLacking.length) {
      if (installments && validTransactions.length >= installments) {
        isActive = false
        break
      }

      const date =
        datesLacking.shift() ||
        addMonths(latestTransactionDate, ++monthsAfterLatest).toISOString()
      if (isAfterRecurrenceLimit(new Date(date))) break

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

      if (installments && validTransactions.length >= installments) {
        isActive = false
      }
    }

    // Só escreve se algo mudou: toda escrita dispara um novo check
    if (
      transactions.length !== initialLength ||
      transactionsChanged ||
      isActive !== item.isActive
    ) {
      recurrencesToUpdate.push({ id: item.id, transactions, isActive })
    }
    resolve()
  }

  const promises = recurrenceList.map(
    (item) => new Promise((resolve) => check(item, resolve))
  )
  await Promise.all(promises)

  recurrencesToUpdate.forEach((item) => updateRecurrenceTransactionList(item))

  resolve()
}

const AUTO_UPDATE_LIMIT = 5
const AUTO_UPDATE_WINDOW_MS = 60 * 1000

export const createRecurrenceAutoUpdateGuard = (
  limit = AUTO_UPDATE_LIMIT,
  windowMs = AUTO_UPDATE_WINDOW_MS
) => {
  const updates: { [id: string]: number[] } = {}
  const blocked = new Set<string>()

  return {
    isBlocked: (id: string) => blocked.has(id),
    register: (id: string) => {
      if (blocked.has(id)) return false
      const now = Date.now()
      const recent = (updates[id] || []).filter((t) => now - t < windowMs)
      if (recent.length >= limit) {
        blocked.add(id)
        return false
      }
      updates[id] = [...recent, now]
      return true
    },
  }
}
