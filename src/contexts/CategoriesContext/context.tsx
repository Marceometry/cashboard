import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useLocalStorage } from '@/hooks'
import { TransactionModel, useTransactions } from '@/contexts'
import { filterByMonth, filterByYear, getFormattedMonthAndYear } from '@/utils'
import { CategoriesContextData, CategoryModel } from '.'

export type CategoriesContextProviderProps = {
  children: ReactNode
}

export const CategoriesContext = createContext({} as CategoriesContextData)

export function CategoriesContextProvider({
  children,
}: CategoriesContextProviderProps) {
  const storage = useLocalStorage()
  const { transactionList } = useTransactions()
  const [categoryList, setCategoryList] = useState<CategoryModel[]>(() =>
    storage.get('categories', [])
  )

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

  const generateCategoriesHistory = () => {
    const categoriesHistory = transactionList.reduce(
      (acc: any[], item: TransactionModel) => {
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
    storage.set('categories', categories)
  }, [transactionList])

  return (
    <CategoriesContext.Provider
      value={{
        categoryList,
        setCategoryList,
        generateCategoriesByDate,
        generateCategoriesHistory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = () => useContext(CategoriesContext)
