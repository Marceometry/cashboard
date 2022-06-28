type LocaStorageItem = 'transactions' | 'categories'

export const useLocalStorage = () => {
  const get = (item: LocaStorageItem, defaultValue?: any) => {
    const list = localStorage.getItem(`@cashboard/${item}`)
    if (!list) return defaultValue
    return JSON.parse(list)
  }

  const set = (item: LocaStorageItem, data: any) => {
    localStorage.setItem(`@cashboard/${item}`, JSON.stringify(data))
  }

  return { get, set }
}
