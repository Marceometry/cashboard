import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { AddTransactionModel, formatTransaction, useAuth } from '@/contexts'
import { useApiCall, useFirebaseDatabase } from '@/hooks'
import {
  AddRecurrentTransaction,
  RecurrencesContextData,
  RecurrentTransaction,
  UpdateRecurrenceTransactionListArgs,
  UpdateRecurrentTransaction,
} from './types'
import { checkRecurrences } from './utils'

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
    onAddRecurrence,
    onChangeRecurrence,
    onRemoveRecurrence,
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

  const removeRecurrence = call(
    async (id: string) => {
      const recurrence = recurrenceList.find((item) => item.id === id)
      if (!recurrence) throw new Error()
      recurrence.transactions.forEach(
        async (item) => await removeTransaction(item.id)
      )
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
    if (!user?.id) return
    checkRecurrences({
      recurrenceList,
      addTransaction,
      updateRecurrenceTransactionList,
    })
  }, [user?.id, recurrenceList])

  useEffect(() => {
    if (!user?.id) return clearState()

    const unsubscribeAdd = onAddRecurrence((data) => {
      setRecurrenceList((oldState) => [
        ...oldState,
        { ...data, transactions: data.transactions || [] },
      ])
    })
    const unsubscribeChange = onChangeRecurrence((data) => {
      setRecurrenceList((oldState) => {
        return oldState.map((item) => {
          if (item.id !== data.id) return item
          return { ...data, transactions: data.transactions || [] }
        })
      })
    })
    const unsubscribeRemove = onRemoveRecurrence((data) => {
      setRecurrenceList((oldState) => {
        const newList = oldState.filter((item) => item.id !== data.id)
        return newList
      })
    })
    return () => {
      unsubscribeAdd()
      unsubscribeChange()
      unsubscribeRemove()
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
