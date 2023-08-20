import {
  addMonths,
  differenceInCalendarMonths,
  isFuture,
  isSameDay,
  isThisMonth,
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

export const firebaseDataSnapshotToRecurrenceList = (
  data: FirebaseDataSnapshot<RecurrentTransaction>
) => {
  return Object.entries(data).map(([id, values]) => ({
    ...values,
    transactions: values.transactions || [],
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
}

export const checkRecurrences = async ({
  recurrenceList,
  transactionList,
  addTransaction,
  updateRecurrenceTransactionList,
}: CheckRecurrencesProps) => {
  const recurrencesToUpdate: UpdateRecurrenceTransactionListArgs[] = []

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
    if (isFuture(startDate) && !isThisMonth(startDate)) return resolve()

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

    if (item.description === 'Passagem - Manaus') {
      console.log('transactions', item.transactions)
      console.log('correctedTransactions', correctedTransactions)
    }

    const monthsPassed = differenceInCalendarMonths(new Date(), startDate)

    const transactionsByDate = sortByDate(correctedTransactions)
    const datesLacking = transactionsByDate.reduce((acc, t, index, array) => {
      if (index === 0) return acc

      const currentDate = new Date(t.date)
      const lastDate = new Date(array[index - 1].date)
      const difference = differenceInCalendarMonths(lastDate, currentDate)
      if (difference > 1) {
        const dates = new Array(difference - 1)
          .fill('')
          .map((_, index) => subMonths(lastDate, index + 1).toISOString())
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

      const date = addMonths(latestTransactionDate, 1).toISOString()
      recurrencesToUpdate.push({
        id: item.id,
        transactions: [...correctedTransactions, { id: '', date }],
        isActive: false,
      })
      return resolve()
    }

    const transactions = correctedTransactions
    const validTransactions = transactions.filter((t) => !!t.id)
    for (
      let i = 1;
      transactions.length - 1 < monthsPassed || !!datesLacking.length;
      i++
    ) {
      if (installments && validTransactions.length >= installments) {
        isActive = false
        break
      }

      const date =
        datesLacking.shift() ||
        addMonths(latestTransactionDate, i).toISOString()
      if (isFuture(new Date(date)) && !isThisMonth(new Date(date))) break

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

    recurrencesToUpdate.push({ id: item.id, transactions, isActive })
    resolve()
  }

  const promises = recurrenceList.map(
    (item) => new Promise((resolve) => check(item, resolve))
  )
  await Promise.all(promises)

  recurrencesToUpdate.forEach((item) => updateRecurrenceTransactionList(item))
}
