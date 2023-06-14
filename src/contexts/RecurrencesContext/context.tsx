import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { formatTransaction, useAuth } from '@/contexts'
import { useApiCall, useFirebaseDatabase } from '@/hooks'
import {
  AddRecurrentTransaction,
  AddTransactionModel,
  RecurrentTransaction,
  RemoveRecurrenceArgs,
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
  const { user } = useAuth()
  const { call } = useApiCall()
  const {
    onRecurrencesValue,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
    remoteAddTransaction,
    remoteRemoveTransaction,
  } = useFirebaseDatabase()
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

  const removeRecurrence = call<RemoveRecurrenceArgs>(
    async ({ id, deleteAllTransactions }) => {
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
    async (payload: UpdateRecurrentTransaction) => {
      const recurrence = recurrenceList.find((item) => item.id === payload.id)
      if (!recurrence) throw new Error()
      await remoteAddRecurrence({ ...recurrence, ...payload })
    },
    { toastText: 'Recorrência atualizada com sucesso!' }
  )

  const updateRecurrenceTransactionList =
    call<UpdateRecurrenceTransactionListArgs>(
      async ({ id, transactions, isActive }) => {
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
    if (!user?.id || !recurrenceList.length) return
    checkRecurrences({
      recurrenceList,
      addTransaction,
      updateRecurrenceTransactionList,
    })
  }, [user?.id, recurrenceList])

  useEffect(() => {
    if (!user?.id) return clearState()

    const unsubscribeOnValue = onRecurrencesValue((data) => {
      const recurrences = firebaseDataSnapshotToRecurrenceList(data)
      setRecurrenceList(recurrences)
    })

    return () => {
      unsubscribeOnValue()
    }
  }, [user?.id])

  return (
    <RecurrencesContext.Provider
      value={{
        recurrenceList,
        addRecurrence,
        updateRecurrence,
        removeRecurrence,
      }}
    >
      {children}
    </RecurrencesContext.Provider>
  )
}

export const useRecurrences = () => useContext(RecurrencesContext)
