import { TableProps as ChakraTableProps } from '@chakra-ui/react'

export type FilterModel = {
  selectedMonth: number
  selectedYear: number
}

export type ColumnProps<T> = {
  label: string
  field: keyof T | ''
  customRender?: (data: T) => JSX.Element | string
}

export type ButtonProps = {
  children: string
  onClick: () => void
  variant?: 'outline' | 'ghost' | 'link' | 'solid' | 'unstyled'
}

export type TableProps = ChakraTableProps & {
  data: any[]
  columns: ColumnProps<any>[]
  buttons?: ButtonProps[]
  caption?: string
  sortBy?: string
  noFilters?: boolean
  dateField?: string
}
