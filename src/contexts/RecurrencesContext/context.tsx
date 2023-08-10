import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { formatTransaction, useAuth } from '@/contexts'
import { useFirebaseContext, useTransactions } from '@/contexts'
import { useApiCall, useLocalStorage } from '@/hooks'
import {
  AddRecurrentTransaction,
  AddTransactionModel,
  RecurrentTransaction,
  UpdateRecurrentTransaction,
} from '@/types'
import {
  RecurrencesContextData,
  UpdateRecurrenceTransactionListArgs,
} from './types'
import { checkRecurrences, firebaseDataSnapshotToRecurrenceList } from './utils'

type RecurrencesContextProviderProps = {
  children: ReactNode
}

export const RecurrencesContext = createContext({} as RecurrencesContextData)

export function RecurrencesContextProvider({
  children,
}: RecurrencesContextProviderProps) {
  const storage = useLocalStorage()
  const { user } = useAuth()
  const { call, isLoading, setIsLoading } = useApiCall()
  const {
    onRecurrencesValue,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
    remoteAddTransaction,
    remoteRemoveTransaction,
  } = useFirebaseContext()
  const { transactionList } = useTransactions()
  const [isLoadingCache, setIsLoadingCache] = useState(true)
  const [recurrenceList, setRecurrenceList] = useState<RecurrentTransaction[]>(
    []
  )

  const addRecurrence = call(
    async (payload: AddRecurrentTransaction) => {
      const recurrence = {
        ...payload,
        id: uuid(),
        category: payload.category || 'Outros',
        transactions: [],
        isActive: true,
      }
      await remoteAddRecurrence(recurrence)
    },
    { toastText: 'Recorrência adicionada com sucesso!' }
  )

  const removeRecurrence = call(
    async (id: string, deleteAllTransactions: boolean) => {
      if (deleteAllTransactions) {
        const recurrence = recurrenceList.find((item) => item.id === id)
        if (!recurrence) throw new Error()
        recurrence.transactions.forEach(
          async (item) => await removeTransaction(item.id)
        )
      }
      await remoteRemoveRecurrence(id)
    },
    { toastText: 'Recorrência excluída com sucesso!' }
  )

  const updateRecurrence = call(
    async (payload: UpdateRecurrentTransaction, noToast?: boolean) => {
      const recurrence = recurrenceList.find((item) => item.id === payload.id)
      if (!recurrence) throw new Error()
      await remoteAddRecurrence({ ...recurrence, ...payload })
      return noToast
    },
    {
      toastText: (noToast) =>
        noToast ? '' : 'Recorrência atualizada com sucesso!',
    }
  )

  const updateRecurrenceTransactionList = call(
    async ({
      id,
      transactions,
      isActive,
    }: UpdateRecurrenceTransactionListArgs) => {
      const recurrence = recurrenceList.find((item) => item.id === id)
      if (!recurrence) throw new Error()
      await remoteAddRecurrence({
        ...recurrence,
        id,
        transactions,
        isActive,
      })
    }
  )

  const addTransaction = call(async (payload: AddTransactionModel) => {
    const transaction = formatTransaction({ ...payload, id: uuid() })
    await remoteAddTransaction(transaction)
    return transaction
  })

  const removeTransaction = call(async (id: string) =>
    remoteRemoveTransaction(id)
  )

  const clearState = () => {
    setRecurrenceList([])
  }

  useEffect(() => {
    if (
      !user?.id ||
      !recurrenceList.length ||
      !transactionList.length ||
      isLoading
    ) {
      return
    }
    checkRecurrences({
      recurrenceList,
      transactionList,
      addTransaction,
      updateRecurrenceTransactionList,
    })
  }, [user?.id, recurrenceList, transactionList])

  useEffect(() => {
    if (!user?.id) return clearState()

    const recurrences = storage.get('recurrence-list')
    setRecurrenceList(recurrences || [])
    setIsLoadingCache(!recurrences?.length)

    const unsubscribeOnValue = onRecurrencesValue((data) => {
      const recurrences = firebaseDataSnapshotToRecurrenceList(data)
      storage.set('recurrence-list', recurrences)
      setRecurrenceList(recurrences)
      setIsLoadingCache(false)
      setIsLoading(false)
    })

    return () => {
      unsubscribeOnValue()
    }
  }, [user?.id, onRecurrencesValue])

  return (
    <RecurrencesContext.Provider
      value={{
        recurrenceList,
        addRecurrence,
        updateRecurrence,
        removeRecurrence,
        isLoadingCache,
      }}
    >
      {children}
    </RecurrencesContext.Provider>
  )
}

export const useRecurrences = () => useContext(RecurrencesContext)
