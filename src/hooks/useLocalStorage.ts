import { useAuth } from '@/contexts'

type LocaStorageItem =
  | 'transaction-list'
  | 'recurrence-list'
  | 'transactions-table-filters'
  | 'transactions-table-filters-specific-date'
  | 'categories-page-filters'
  | 'payment-methods-page-filters'
  | 'sidebar-default-open'
  | 'categories-average-outcome-filter'
  | 'categories-average-month-count-filter'
  | 'date-param'

export const useLocalStorage = () => {
  const { user } = useAuth()

  const get = (item: LocaStorageItem, defaultValue?: any) => {
    const response = localStorage.getItem(`@cashboard/${user?.id}/${item}`)
    if (!response) return defaultValue
    return JSON.parse(response)
  }

  const set = (item: LocaStorageItem, data: any) => {
    localStorage.setItem(`@cashboard/${user?.id}/${item}`, JSON.stringify(data))
  }

  const remove = (item: LocaStorageItem) => {
    localStorage.removeItem(`@cashboard/${user?.id}/${item}`)
  }

  return { get, set, remove }
}
