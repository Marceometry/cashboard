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

export const getFormattedMonthAndYear = (
  originalDate: Date | string,
  fullYear?: boolean
) => {
  const date = new Date(originalDate)
  const year = fullYear ? 'yyyy' : 'yy'
  return format(date, `MM/${year}`)
}

export const getFormattedDayAndMonth = (originalDate: Date | string) => {
  const date = new Date(originalDate)
  return format(date, `dd/MM`)
}
