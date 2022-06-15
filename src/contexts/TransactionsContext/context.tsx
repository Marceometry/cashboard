import { useLocalStorage } from '@/hooks'
import { createContext, useContext, useState, ReactNode } from 'react'
import {
  TransactionsContextData,
  CategoryModel,
  TransactionModel,
  AddTransactionModel,
} from '.'

export type TransactionsContextProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const { get, set } = useLocalStorage()
  const [isLoading, setIsLoading] = useState(false)
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([])
  const [transactionList, setTransactionList] = useState<TransactionModel[]>(
    () => get()
  )

  const addTransaction = (transaction: AddTransactionModel) => {
    const newTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
      date: new Date(),
    }
    setTransactionList((oldState) => {
      const transactionWithId = {
        ...newTransaction,
        id: oldState.length + 1,
      }
      const newTransactionList = [...oldState, transactionWithId]
      set(newTransactionList)
      return newTransactionList
    })
    setCategoryList((oldState) => {
      const { amount, category, type } = newTransaction
      const isIncome = type === 'income'
      const currentCategory = oldState.find((c) => c.name === category)
      if (!currentCategory) {
        const newCategory = {
          name: category,
          income: isIncome ? amount : 0,
          outcome: !isIncome ? amount : 0,
          balance: isIncome ? amount : -amount,
        }
        return [...oldState, newCategory]
      }
      return oldState?.map((c) => {
        if (c.name !== category) return c
        return {
          ...c,
          income: isIncome ? c.income + amount : c.income,
          outcome: !isIncome ? c.outcome + amount : c.outcome,
          balance: isIncome ? c.balance + amount : c.balance - amount,
        }
      })
    })
  }

  const removeTransaction = (transaction: TransactionModel) => {
    setTransactionList((oldState) => {
      const newList = oldState.filter((item) => item.id !== transaction.id)
      set(newList)
      return newList
    })
    setCategoryList((oldState) => {
      const { category, amount, type } = transaction
      const isIncome = type === 'income'
      const currentCategory = oldState.find((c) => c.name === category)
      if (
        Math.abs(Number(currentCategory?.balance)) === amount &&
        currentCategory?.[type] === amount
      ) {
        return oldState.filter((c) => c.name !== category)
      }
      return oldState?.map((c) => {
        if (c.name !== category) return c
        return {
          ...c,
          income: isIncome ? c.income - amount : c.income,
          outcome: !isIncome ? c.outcome - amount : c.outcome,
          balance: isIncome ? c.balance - amount : c.balance + amount,
        }
      })
    })
  }

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        transactionList,
        setTransactionList,
        categoryList,
        setCategoryList,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
