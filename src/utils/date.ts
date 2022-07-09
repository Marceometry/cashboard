import { format } from 'date-fns'

export const formatDateValue = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}

export const filterByMonth = (date: string, month: number) => {
  return new Date(date).getMonth() + 1 === month
}

export const filterByYear = (date: string, year: number) => {
  return new Date(date).getFullYear() === year
}
