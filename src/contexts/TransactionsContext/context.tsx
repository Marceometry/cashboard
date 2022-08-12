import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useAuth } from '@/contexts'
import { useApiCall, useFirebaseDatabase } from '@/hooks'
import { formatTransaction, isTransactionListInvalid } from './utils'
import {
  TransactionsContextData,
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
  const { user } = useAuth()
  const {
    onAddTransaction,
    onChangeTransaction,
    onRemoveTransaction,
    remoteAddTransaction,
    remoteRemoveTransaction,
    initialLoad,
  } = useFirebaseDatabase()
  const { call, isLoading, setIsLoading } = useApiCall()
  const [transactionList, setTransactionList] = useState<TransactionModel[]>([])

  const addTransactionListItem = call(async (payload: TransactionModel) => {
    const item = formatTransaction({ ...payload, id: payload.id || uuid() })
    await remoteAddTransaction(item)
  })

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

  const uploadTransactionList = call(
    (list: string) => {
      const parsed: TransactionModel[] = JSON.parse(list)

      const isInvalid = isTransactionListInvalid(parsed)
      if (isInvalid) throw new Error()

      parsed.forEach((item) => addTransactionListItem(item))
    },
    { toastText: 'Upload feito com sucesso!', toastError: 'Arquivo Inválido' }
  )

  useEffect(() => {
    if (!user?.id) return

    const unsubscribeInitialLoad = initialLoad(() => setIsLoading(false))
    const unsubscribeAdd = onAddTransaction((data) => {
      setTransactionList((oldState) => [...oldState, data])
      setIsLoading(false)
    })
    const unsubscribeChange = onChangeTransaction((data) => {
      setTransactionList((oldState) => {
        return oldState.map((item) => {
          if (item.id !== data.id) return item
          return { ...item, ...data }
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
      unsubscribeInitialLoad()
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
        addTransaction,
        updateTransaction,
        removeTransaction,
        uploadTransactionList,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
