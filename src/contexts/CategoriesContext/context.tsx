import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { TransactionModel, TransactionType, useTransactions } from '@/contexts'
import {
  filterByMonth,
  filterByYear,
  getFormattedMonthAndYear,
  sortByDate,
} from '@/utils'
import { CategoriesContextData, CategoriesFilterModel, CategoryModel } from '.'

export type CategoriesContextProviderProps = {
  children: ReactNode
}

export const CategoriesContext = createContext({} as CategoriesContextData)

export function CategoriesContextProvider({
  children,
}: CategoriesContextProviderProps) {
  const { transactionList, isLoading } = useTransactions()
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([])

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

  const generateFilteredCategories = (
    filters: CategoriesFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount } = filters

    const transactions = sortByDate(transactionList, true).filter(
      (item: TransactionModel) => {
        if (month && !filterByMonth(item.date, month)) return false
        if (year && !filterByYear(item.date, year)) return false
        return true
      }
    )

    return generateCategories(transactions).filter((item) => {
      if (minAmount && item[type] < minAmount) return false
      if (maxAmount && item[type] > maxAmount) return false
      return true
    })
  }

  const generateCategoriesHistory = (
    filters: CategoriesFilterModel,
    type: TransactionType
  ) => {
    const { month, year, minAmount, maxAmount } = filters
    const orderedList: TransactionModel[] = sortByDate(transactionList, true)

    const categoriesHistory = orderedList.reduce(
      (acc: any[], item: TransactionModel) => {
        if (item.type !== type) return acc
        if (minAmount && item.amount < minAmount) return acc
        if (maxAmount && item.amount > maxAmount) return acc
        if (month && !filterByMonth(item.date, month)) return acc
        if (year && !filterByYear(item.date, year)) return acc

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
      },
      []
    )
    const categoryNamesObject = categoryList.reduce((acc, value) => {
      return { ...acc, [value.name]: 0 }
    }, {})

    return categoriesHistory.map((item) => ({
      ...categoryNamesObject,
      ...item,
    }))
  }

  useEffect(() => {
    const categories = generateCategories(transactionList)
    setCategoryList(categories)
  }, [transactionList])

  return (
    <CategoriesContext.Provider
      value={{
        isLoading,
        categoryList,
        setCategoryList,
        generateFilteredCategories,
        generateCategoriesHistory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext)
