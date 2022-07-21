import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useFirebaseDatabase } from '@/hooks'
import { formatTransaction } from './utils'
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
  const {
    onAddTransaction,
    onChangeTransaction,
    onRemoveTransaction,
    remoteAddTransaction,
    remoteRemoveTransaction,
    initialLoad,
  } = useFirebaseDatabase()
  const [transactionList, setTransactionList] = useState<TransactionModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const addTransaction = async (payload: AddTransactionModel) => {
    const transaction = formatTransaction({ ...payload, id: uuid() })
    try {
      setIsLoading(true)
      await remoteAddTransaction(transaction)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const updateTransaction = async (payload: TransactionModel) => {
    const transaction = formatTransaction(payload)
    try {
      setIsLoading(true)
      await remoteAddTransaction(transaction)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const removeTransaction = async (transaction: TransactionModel) => {
    try {
      setIsLoading(true)
      await remoteRemoveTransaction(transaction.id)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        transactionList,
        setTransactionList,
        addTransaction,
        updateTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => useContext(TransactionsContext)
