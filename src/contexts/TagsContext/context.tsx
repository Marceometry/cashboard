import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { TransactionModel, useTransactions } from '@/contexts'
import { TagsContextData, TagModel } from '.'

export type TagsContextProviderProps = {
  children: ReactNode
}

export const TagsContext = createContext({} as TagsContextData)

export function TagsContextProvider({ children }: TagsContextProviderProps) {
  const { transactionList } = useTransactions()
  const [tagList, setTagList] = useState<TagModel[]>([])

  const generateTags = (transactions: TransactionModel[]): TagModel[] => {
    console.log(tagList)
    const newTagList = transactions.reduce((acc: TagModel[], transaction) => {
      const { type, amount, tags = [] } = transaction
      const isIncome = type === 'income'
      if (!!tags.length) console.log(tags)
      tags.forEach((tag) => {
        const tagIndex = acc.findIndex((item) => item.name === tag)

        if (tagIndex < 0) {
          return acc.push({
            name: tag,
            income: isIncome ? amount : 0,
            outcome: !isIncome ? amount : 0,
            balance: isIncome ? amount : -amount,
          })
        }

        const { name, income, outcome, balance } = acc[tagIndex]
        acc[tagIndex] = {
          name,
          income: isIncome ? income! + amount : income,
          outcome: !isIncome ? outcome! + amount : outcome,
          balance: isIncome ? balance! + amount : balance! - amount,
        }
      })

      return acc
    }, [] as TagModel[])
    console.log(newTagList)
    return newTagList
  }

  useEffect(() => {
    const tags = generateTags(transactionList)
    setTagList(tags)
  }, [transactionList])

  return (
    <TagsContext.Provider value={{ tagList }}>{children}</TagsContext.Provider>
  )
}

export const useTags = () => useContext(TagsContext)
