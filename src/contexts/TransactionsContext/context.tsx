import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useAuth } from '@/contexts'
import { useApiCall, useFirebaseDatabase, useLocalStorage } from '@/hooks'
import {
  AddTransactionModel,
  CategoryModel,
  DateParam,
  TagModel,
  TransactionModel,
} from '@/types'
import { Optional } from '@/utils'
import { TransactionsContextData } from './types'
import {
  filterMostRepeatedTransactions,
  firebaseDataSnapshotToTransactionList,
  formatTransaction,
  generateCategories,
  generateMostRepeatedTransactions,
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
  const { user } = useAuth()
  const { call, isLoading, setIsLoading } = useApiCall()
  const { onTransactionsValue, remoteAddTransaction, remoteRemoveTransaction } =
    useFirebaseDatabase()
  const storage = useLocalStorage()

  const [dateParam, setDateParam] = useState<DateParam>(
    storage.get('date-param') || 'date'
  )
  const [transactionList, setTransactionList] = useState<TransactionModel[]>([])
  const [mostRepeatedTransactions, setMostRepeatedTransactions] = useState<
    TransactionModel[]
  >([])
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([])
  const [tagList, setTagList] = useState<TagModel[]>([])

  const addTransaction = call(
    async (payload: AddTransactionModel) => {
      const transaction = formatTransaction({ ...payload, id: uuid() })
      await remoteAddTransaction(transaction)
      return transaction
    },
    { toastText: 'Transação adicionada com sucesso!' }
  )

  const updateTransaction = call(
    async (payload: Optional<TransactionModel, 'datePayed'>) => {
      const transaction = formatTransaction(payload)
      await remoteAddTransaction(transaction)
      return transaction
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

  const getAvailableYearList = () => getYearList(transactionList, dateParam)

  const getFilteredMostRepeatedTransactions = (text: string) =>
    filterMostRepeatedTransactions(text, mostRepeatedTransactions)

  useEffect(() => {
    storage.set('date-param', dateParam)
  }, [dateParam])

  useEffect(() => {
    const categories = generateCategories(transactionList)
    setCategoryList(categories)
    const tags = generateTags(transactionList)
    setTagList(tags)
    const mostRepeated = generateMostRepeatedTransactions(transactionList)
    setMostRepeatedTransactions(mostRepeated)
  }, [transactionList])

  useEffect(() => {
    if (!user?.id) return clearState()

    const unsubscribeOnValue = onTransactionsValue((data) => {
      const transactions = firebaseDataSnapshotToTransactionList(data)
      setTransactionList(transactions)
      setIsLoading(false)
    })

    return () => {
      unsubscribeOnValue()
    }
  }, [user?.id])

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        transactionList,
        mostRepeatedTransactions,
        categoryList,
        tagList,
        addTransaction,
        updateTransaction,
        removeTransaction,
        updateTransactionList,
        uploadTransactionList,
        getAvailableYearList,
        getFilteredMostRepeatedTransactions,
        dateParam,
        setDateParam,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
