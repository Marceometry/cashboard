import { isBefore } from 'date-fns'

export const sortAlphabetically = (array: any[], sortBy: string) => {
  return array.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
}

export const sortByDate = (
  array: any[],
  oldestFirst?: boolean,
  dateField: string = 'date'
) => {
  return array.sort((a, b) => {
    const date1 = new Date(a[dateField])
    const date2 = new Date(b[dateField])
    if (oldestFirst)
      return isBefore(date2, date1) ? 1 : isBefore(date1, date2) ? -1 : 0
    return isBefore(date1, date2) ? 1 : isBefore(date2, date1) ? -1 : 0
  })
}
