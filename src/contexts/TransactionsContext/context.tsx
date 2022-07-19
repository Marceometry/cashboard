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
  } = useFirebaseDatabase()
  const [isLoading, setIsLoading] = useState(false)
  const [transactionList, setTransactionList] = useState<TransactionModel[]>([])

  const addTransaction = async (payload: AddTransactionModel) => {
    const transaction = formatTransaction({ ...payload, id: uuid() })
    try {
      setIsLoading(true)
      await remoteAddTransaction(transaction)
    } catch (error) {
      console.log(error)
    } finally {
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
    } finally {
      setIsLoading(false)
    }
  }

  const removeTransaction = async (transaction: TransactionModel) => {
    try {
      setIsLoading(true)
      await remoteRemoveTransaction(transaction.id)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribeAdd = onAddTransaction((data) => {
      setTransactionList((oldState) => [...oldState, data])
    })
    const unsubscribeChange = onChangeTransaction((data) => {
      setTransactionList((oldState) => {
        const newTransactionList = oldState.map((item) => {
          if (item.id !== data.id) return item
          return { ...item, ...data }
        })
        return newTransactionList
      })
    })
    const unsubscribeRemove = onRemoveTransaction((data) => {
      setTransactionList((oldState) => {
        const newList = oldState.filter((item) => item.id !== data.id)
        return newList
      })
    })
    return () => {
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
