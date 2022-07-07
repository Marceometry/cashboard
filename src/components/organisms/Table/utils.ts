import { getYear } from 'date-fns'
import { FilterModel } from './types'

export const filterByText = (data: any[], columns: any[], text: string) => {
  if (!text) return data
  return data.filter((item) => {
    return !!columns.filter((column) =>
      String(item[column.field]).toLowerCase().includes(text.toLowerCase())
    ).length
  })
}

export const filterByMonth = (date: string, month: number) => {
  return new Date(date).getMonth() + 1 === month
}

export const filterByYear = (date: string, year: number) => {
  return getYear(new Date(date)) === year
}

export const filterData = (
  data: any[],
  filters: FilterModel,
  dateField: string
) => {
  const { selectedMonth, selectedYear, selectedCategories } = filters
  return data.filter((item) => {
    let included = true
    if (selectedMonth) {
      included = filterByMonth(item[dateField], Number(selectedMonth))
      if (!included) return
    }
    if (selectedYear) {
      included = filterByYear(item[dateField], Number(selectedYear))
      if (!included) return
    }
    if (selectedCategories.length) {
      included = selectedCategories.some(
        (category) => category === item.category
      )
      if (!included) return
    }
    return included
  })
}
