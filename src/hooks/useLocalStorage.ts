export const useLocalStorage = () => {
  const get = () => {
    const list = localStorage.getItem('@cashboard/transactions')
    if (!list) return []
    return JSON.parse(list)
  }

  const set = (data: any[]) => {
    localStorage.setItem('@cashboard/transactions', JSON.stringify(data))
  }

  return { get, set }
}
