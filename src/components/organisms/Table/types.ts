import { TableProps as ChakraTableProps } from '@chakra-ui/react'

export type FilterModel = {
  selectedMonth: number
  selectedYear: number
  selectedCategories: string[]
  minAmount: string
  maxAmount: string
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
  sortFunction?: (a: any, b: any) => number
  noFilters?: boolean
  dateField?: string
}
