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
import {
  checkRecurrences,
  firebaseDataSnapshotToRecurrenceList,
  getDescriptionWithInstallments,
  isRecurrenceListInvalid,
  recurrenceListToFirebaseDataSnapshot,
} from './utils'

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
    remoteAddRecurrenceList,
    remoteAddRecurrence,
    remoteRemoveRecurrence,
    remoteAddTransaction,
    remoteRemoveTransaction,
  } = useFirebaseContext()
  const { transactionList, isLoading: isLoadingTransactions } =
    useTransactions()
  const [isLoadingCache, setIsLoadingCache] = useState(true)
  const [isCheckingRecurrences, setIsCheckingRecurrences] = useState(false)
  const [recurrenceList, setRecurrenceList] = useState<RecurrentTransaction[]>(
    []
  )

  const addRecurrence = call(
    async (payload: AddRecurrentTransaction, noToast?: boolean) => {
      const recurrence = {
        ...payload,
        id: uuid(),
        category: payload.category || 'Outros',
        transactions: [],
        isActive: true,
      }
      await remoteAddRecurrence(recurrence)
      return noToast
    },
    {
      toastText: (noToast) =>
        noToast ? '' : 'Recorrência adicionada com sucesso!',
    }
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

  const uploadRecurrenceList = call(
    (list: RecurrentTransaction[]) => {
      const isInvalid = isRecurrenceListInvalid(list)
      if (isInvalid) throw new Error()
      remoteAddRecurrenceList(recurrenceListToFirebaseDataSnapshot(list))
    },
    { toastError: 'Arquivo Inválido' }
  )

  const addTransaction = call(async (payload: AddTransactionModel) => {
    const transaction = formatTransaction({ ...payload, id: uuid() })
    await remoteAddTransaction(transaction)
    return transaction
  })

  const addTransactionInDate = call(
    async (date: string, recurrence: RecurrentTransaction) => {
      const currentInstalment = recurrence.installments
        ? recurrence.transactions.filter((t) => !!t.id).length + 1
        : 0
      const description = getDescriptionWithInstallments(
        recurrence.description,
        currentInstalment,
        recurrence.installments
      )
      const transaction = { ...recurrence, description, date, datePayed: date }

      const { id } = await addTransaction(transaction)
      if (!id) return

      const transactions = [...recurrence.transactions]
      const index = transactions.findIndex((t) => !t.id && t.date === date)
      const value = { date, id }
      if (index !== -1) {
        transactions[index] = value
      } else {
        transactions.push(value)
      }
      const isActive = recurrence.installments
        ? currentInstalment !== recurrence.installments
        : true
      await updateRecurrence({ ...recurrence, transactions, isActive }, true)
    }
  )

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
      isLoading ||
      isLoadingTransactions
    ) {
      return
    }
    if (isCheckingRecurrences) return
    setIsCheckingRecurrences(true)
    checkRecurrences({
      recurrenceList,
      transactionList,
      addTransaction,
      updateRecurrenceTransactionList,
      resolve: () => setIsCheckingRecurrences(false),
    })
  }, [
    user?.id,
    recurrenceList,
    transactionList,
    isLoading,
    isLoadingTransactions,
    isCheckingRecurrences,
  ])

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
        uploadRecurrenceList,
        addTransactionInDate,
        isLoadingCache,
      }}
    >
      {children}
    </RecurrencesContext.Provider>
  )
}

export const useRecurrences = () => useContext(RecurrencesContext)
