type LocaStorageItem =
  | 'transactions'
  | 'categories'
  | 'default-table-view'
  | 'transactions-table-filters'
  | 'categories-table-filters'

export const useLocalStorage = () => {
  const get = (item: LocaStorageItem, defaultValue?: any) => {
    const response = localStorage.getItem(`@cashboard/${item}`)
    if (!response) return defaultValue
    return JSON.parse(response)
  }

  const set = (item: LocaStorageItem, data: any) => {
    localStorage.setItem(`@cashboard/${item}`, JSON.stringify(data))
  }

  return { get, set }
}
