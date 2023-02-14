import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useAuth } from '@/contexts'
import { useApiCall, useFirebaseDatabase } from '@/hooks'
import {
  AddTransactionModel,
  CategoryModel,
  TagModel,
  TransactionModel,
  TransactionsContextData,
} from './types'
import {
  formatTransaction,
  generateCategories,
  generateTags,
  getYearList,
  isTransactionListInvalid,
} from './utils'

export type TransactionsContextProviderProps = {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const { call, isLoading, setIsLoading } = useApiCall()
  const { user } = useAuth()
  const {
    onAddTransaction,
    onChangeTransaction,
    onRemoveTransaction,
    remoteAddTransaction,
    remoteRemoveTransaction,
  } = useFirebaseDatabase()

  const [transactionList, setTransactionList] = useState<TransactionModel[]>([])
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([])
  const [tagList, setTagList] = useState<TagModel[]>([])

  const addTransaction = call(
    async (payload: AddTransactionModel) => {
      const transaction = formatTransaction({ ...payload, id: uuid() })
      await remoteAddTransaction(transaction)
    },
    { toastText: 'Transação adicionada com sucesso!' }
  )

  const updateTransaction = call(
    async (payload: TransactionModel) => {
      const transaction = formatTransaction(payload)
      await remoteAddTransaction(transaction)
    },
    { toastText: 'Transação atualizada com sucesso!' }
  )

  const removeTransaction = call(
    async (transaction: TransactionModel) => {
      await remoteRemoveTransaction(transaction.id)
    },
    { toastText: 'Transação excluída com sucesso!' }
  )

  const addTransactionListItem = call(async (payload: TransactionModel) => {
    const item = formatTransaction({ ...payload, id: payload.id || uuid() })
    await remoteAddTransaction(item)
  })

  const updateTransactionList = call((list: TransactionModel[]) => {
    list.forEach((item) => addTransactionListItem(item))
  })

  const uploadTransactionList = call(
    (list: string) => {
      const parsed: TransactionModel[] = JSON.parse(list)

      const isInvalid = isTransactionListInvalid(parsed)
      if (isInvalid) throw new Error()
      updateTransactionList(parsed)
    },
    { toastText: 'Upload feito com sucesso!', toastError: 'Arquivo Inválido' }
  )

  const clearState = () => {
    setTransactionList([])
    setCategoryList([])
    setTagList([])
  }

  const getAvailableYearList = () => getYearList(transactionList)

  useEffect(() => {
    const categories = generateCategories(transactionList)
    setCategoryList(categories)
    const tags = generateTags(transactionList)
    setTagList(tags)
  }, [transactionList])

  useEffect(() => {
    if (!user?.id) return clearState()

    const unsubscribeAdd = onAddTransaction((data) => {
      setTransactionList((oldState) => [...oldState, data])
      setIsLoading(false)
    })
    const unsubscribeChange = onChangeTransaction((data) => {
      setTransactionList((oldState) => {
        return oldState.map((item) => {
          if (item.id !== data.id) return item
          return formatTransaction(data)
        })
      })
      setIsLoading(false)
    })
    const unsubscribeRemove = onRemoveTransaction((data) => {
      setTransactionList((oldState) => {
        const newList = oldState.filter((item) => item.id !== data.id)
        return newList
      })
      setIsLoading(false)
    })
    return () => {
      unsubscribeAdd()
      unsubscribeChange()
      unsubscribeRemove()
    }
  }, [user?.id])

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        transactionList,
        setTransactionList,
        categoryList,
        tagList,
        addTransaction,
        updateTransaction,
        removeTransaction,
        updateTransactionList,
        uploadTransactionList,
        getAvailableYearList,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
