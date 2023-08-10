import { useAuth } from '@/contexts'

const prefix = '@cashboard'

type LocaStorageItem =
  | 'transaction-list'
  | 'recurrence-list'
  | 'transactions-table-filters'
  | 'transactions-table-filters-specific-date'
  | 'recurrences-table-filters'
  | 'categories-page-filters'
  | 'payment-methods-page-filters'
  | 'sidebar-default-open'
  | 'categories-average-outcome-filter'
  | 'categories-average-month-count-filter'
  | 'date-param'

export const useLocalStorage = () => {
  const { user } = useAuth()

  const get = (item: LocaStorageItem, defaultValue?: any) => {
    if (!user) return defaultValue
    const response = localStorage.getItem(`${prefix}/${user.id}/${item}`)
    if (!response) return defaultValue
    return JSON.parse(response)
  }

  const set = (item: LocaStorageItem, data: any) => {
    if (!user) return
    localStorage.setItem(`${prefix}/${user.id}/${item}`, JSON.stringify(data))
  }

  const remove = (item: LocaStorageItem) => {
    if (!user) return
    localStorage.removeItem(`${prefix}/${user.id}/${item}`)
  }

  const getUser = () => {
    const user = localStorage.getItem(`${prefix}/user`)
    return user ? JSON.parse(user) : null
  }

  const setUser = (user: any) => {
    localStorage.setItem(`${prefix}/user`, JSON.stringify(user))
  }

  const removeUser = () => localStorage.removeItem(`${prefix}/user`)

  return { get, set, remove, getUser, setUser, removeUser }
}
