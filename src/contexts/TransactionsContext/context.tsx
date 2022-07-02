import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useLocalStorage } from '@/hooks'
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
  const [categoryList, setCategoryList] = useState<CategoryModel[]>(() =>
    get('categories', [])
  )
  const [transactionList, setTransactionList] = useState<TransactionModel[]>(
    () => get('transactions', [])
  )

  const addTransaction = (transaction: AddTransactionModel) => {
    const newTransaction = {
      ...transaction,
      amount: Number(transaction.amount),
      date: new Date(`${transaction.date} 00:00:00`),
    }
    setTransactionList((oldState) => {
      const transactionWithId = {
        ...newTransaction,
        id: oldState.length
          ? Math.max(...oldState.map((item) => item.id)) + 1
          : 1,
      }
      const newTransactionList = [...oldState, transactionWithId]
      return newTransactionList
    })
  }

  const removeTransaction = (transaction: TransactionModel) => {
    setTransactionList((oldState) => {
      const newList = oldState.filter((item) => item.id !== transaction.id)
      return newList
    })
  }

  const generateCategories = (
    transactions: TransactionModel[]
  ): CategoryModel[] => {
    const categories = transactions.reduce((acc, transaction) => {
      const { category, amount, type } = transaction
      const isIncome = type === 'income'
      const currentCategory = acc.find((c) => c.name === category)
      if (!currentCategory) {
        const newCategory = {
          name: category,
          income: isIncome ? amount : 0,
          outcome: !isIncome ? amount : 0,
          balance: isIncome ? amount : -amount,
        }
        return [...acc, newCategory]
      }
      if (
        Math.abs(Number(currentCategory?.balance)) === amount &&
        currentCategory?.[type] === amount
      ) {
        return acc.filter((c) => c.name !== category)
      }
      const newCategoryList = acc.map((c) => {
        if (c.name !== category) return c
        return {
          ...c,
          income: isIncome ? c.income + amount : c.income,
          outcome: !isIncome ? c.outcome + amount : c.outcome,
          balance: isIncome ? c.balance + amount : c.balance - amount,
        }
      })
      return newCategoryList
    }, [] as CategoryModel[])
    return categories
  }

  useEffect(() => {
    const categories = generateCategories(transactionList)
    setCategoryList(categories)
    set('categories', categories)
    set('transactions', transactionList)
  }, [transactionList])

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
