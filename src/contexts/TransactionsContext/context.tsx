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
  TransactionType,
} from '.'
import { filterByMonth, filterByYear, getFormattedMonthAndYear } from '@/utils'

export type TransactionsContextProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const storage = useLocalStorage()
  const [isLoading, setIsLoading] = useState(false)
  const [categoryList, setCategoryList] = useState<CategoryModel[]>(() =>
    storage.get('categories', [])
  )
  const [transactionList, setTransactionList] = useState<TransactionModel[]>(
    () => storage.get('transactions', [])
  )

  const addTransaction = (transaction: AddTransactionModel) => {
    const newTransaction = {
      ...transaction,
      category: transaction.category || 'Outros',
      amount: Number(transaction.amount),
      date: new Date(`${transaction.date} 00:00:00`).toISOString(),
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

  const updateTransaction = (transaction: TransactionModel) => {
    const newTransaction = {
      ...transaction,
      category: transaction.category || 'Outros',
      amount: Number(transaction.amount),
      date: new Date(`${transaction.date} 00:00:00`).toISOString(),
    }
    setTransactionList((oldState) => {
      const newTransactionList = oldState.map((item) => {
        if (item.id !== transaction.id) return item
        return { ...item, ...newTransaction }
      })
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

  const generateCategoriesByDate = (month: number, year: number) => {
    const transactions = transactionList.filter((item) => {
      let included = true
      if (month) {
        included = filterByMonth(item.date, month)
        if (!included) return
      }
      if (year) {
        included = filterByYear(item.date, year)
        if (!included) return
      }
      return included
    })

    return generateCategories(transactions)
  }

  const generateCategoriesHistory = (chartType: TransactionType) => {
    return transactionList.reduce((acc: any[], item: TransactionModel) => {
      const { amount, category } = item
      const date = new Date(item.date)

      const name = getFormattedMonthAndYear(date)
      const itemIndex = acc.findIndex((accItem) => accItem.name === name)

      if (acc[itemIndex]) {
        const value = acc[itemIndex][category]
          ? acc[itemIndex][category] + amount
          : amount

        acc[itemIndex] = { ...acc[itemIndex], name, [category]: value }
        return [...acc]
      }

      return [...acc, { name, [category]: amount ?? 0 }]
    }, [])
  }

  useEffect(() => {
    const categories = generateCategories(transactionList)
    setCategoryList(categories)
    storage.set('categories', categories)
    storage.set('transactions', transactionList)
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
        updateTransaction,
        removeTransaction,
        generateCategoriesByDate,
        generateCategoriesHistory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
