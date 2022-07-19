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
  const storage = useLocalStorage()
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    storage.set('transactions', transactionList)
  }, [transactionList])

  return (
    <TransactionsContext.Provider
      value={{
        isLoading,
        setIsLoading,
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
