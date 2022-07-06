import { format } from 'date-fns'

export const formatDateValue = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}
