import { addMonths, format, isPast, isToday, isValid } from 'date-fns'

export const DATE_INPUT_REGEX =
  /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/

export const getDateMidnight = (date: Date | string = new Date()) => {
  let response = new Date(date)
  if (!isValid(response)) response = new Date()
  response.setHours(0, 0, 0, 0)
  return response
}

export const formatDateToInput = (date: Date | string): string => {
  try {
    return format(new Date(date), 'yyyy-MM-dd')
  } catch (error) {
    return format(new Date(), 'yyyy-MM-dd')
  }
}

export const formatInputToISOString = (
  date: string // yyyy-MM-dd
): string => {
  try {
    return new Date(`${date} 00:00:00`).toISOString()
  } catch (error) {
    return new Date().toISOString()
  }
}

export const filterByMonth = (date: string, month: number) => {
  try {
    return new Date(date).getMonth() + 1 === month
  } catch (error) {
    return false
  }
}

export const filterByYear = (date: string, year: number) => {
  try {
    return new Date(date).getFullYear() === year
  } catch (error) {
    return false
  }
}

export const getFormattedMonthAndYear = (
  originalDate: Date | string,
  fullYear?: boolean
) => {
  const year = fullYear ? 'yyyy' : 'yy'
  const formatString = `MM/${year}`
  try {
    const date = new Date(originalDate)
    return format(date, formatString)
  } catch (error) {
    return formatString
  }
}

export const getFormattedDayAndMonth = (originalDate: Date | string) => {
  const formatString = 'dd/MM'
  try {
    const date = new Date(originalDate)
    return format(date, 'dd/MM')
  } catch (error) {
    return formatString
  }
}

export const getNextDateByMonthDay = (day: number) => {
  const date = getDateMidnight()
  date.setDate(day)
  const isDatePast = isPast(date) && !isToday(date)

  return isDatePast ? addMonths(date, 1) : date
}
