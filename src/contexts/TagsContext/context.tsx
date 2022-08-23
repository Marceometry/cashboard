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
    const newTags = transactions.reduce((acc, transaction) => {
      const { tags = [] } = transaction
      const newTagList = tags.map((tag) => ({ name: tag }))
      return [...acc, ...newTagList]
    }, [] as TagModel[])
    return newTags
  }

  useEffect(() => {
    const tags = generateTags(transactionList)
    setTagList(tags)
  }, [transactionList])

  return (
    <TagsContext.Provider
      value={{
        tagList,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}

export const useTags = () => useContext(TagsContext)
