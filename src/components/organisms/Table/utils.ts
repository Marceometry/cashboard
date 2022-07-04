import { getMonth, getYear } from 'date-fns'

export const filterByText = (data: any[], columns: any[], text: string) => {
  if (!text) return data
  return data.filter((item) => {
    return !!columns.filter((column) =>
      String(item[column.field]).toLowerCase().includes(text.toLowerCase())
    ).length
  })
}

export const filterByMonth = (data: any[], month: number) => {
  if (!month) return data
  return data.filter((item) => {
    return getMonth(new Date(item.date)) + 1 === month
  })
}

export const filterByYear = (data: any[], year: number) => {
  if (!year) return data
  return data.filter((item) => {
    return getYear(new Date(item.date)) === year
  })
}
