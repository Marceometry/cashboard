import { isBefore, isValid } from 'date-fns'

const alphabetically = (a: string, b: string, reverse?: boolean) => {
  return reverse ? b.localeCompare(a) : a.localeCompare(b)
}

const byDate = (a: string, b: string, oldestFirst?: boolean) => {
  const date1 = new Date(a)
  const date2 = new Date(b)
  if (oldestFirst)
    return isBefore(date2, date1) ? 1 : isBefore(date1, date2) ? -1 : 0
  return isBefore(date1, date2) ? 1 : isBefore(date2, date1) ? -1 : 0
}

export const sortAlphabetically = (array: any[], sortBy: string) => {
  return array.sort((a, b) => alphabetically(a[sortBy], b[sortBy]))
}

export const sortByDate = (
  array: any[],
  oldestFirst?: boolean,
  dateField = 'date'
) => {
  return array.sort((a, b) => byDate(a[dateField], b[dateField], oldestFirst))
}

export const dynamicSort = (a: any, b: any, reverse?: boolean) => {
  if (isValid(new Date(a))) return byDate(a, b, reverse)
  if (typeof a === 'string') return alphabetically(a, b, reverse)
  if (typeof a === 'number') {
    if (reverse) return a - b
    return b - a
  }
  return 0
}
