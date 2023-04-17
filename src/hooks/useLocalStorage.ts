type LocaStorageItem =
  | 'transactions-table-filters'
  | 'transactions-table-filters-specific-date'
  | 'categories-page-filters'
  | 'sidebar-default-open'
  | 'categories-average-outcome-filter'
  | 'categories-average-month-count-filter'

export const useLocalStorage = () => {
  const get = (item: LocaStorageItem, defaultValue?: any) => {
    const response = localStorage.getItem(`@cashboard/${item}`)
    if (!response) return defaultValue
    return JSON.parse(response)
  }

  const set = (item: LocaStorageItem, data: any) => {
    localStorage.setItem(`@cashboard/${item}`, JSON.stringify(data))
  }

  const remove = (item: LocaStorageItem) => {
    localStorage.removeItem(`@cashboard/${item}`)
  }

  return { get, set, remove }
}
