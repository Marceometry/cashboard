import React from 'react'
import { TableProps as ChakraTableProps } from '@chakra-ui/react'
import { IconButtonProps, LabelType } from '@/components'

export type ColumnProps<T> = {
  label?: string
  field?: keyof T
  customRender?: (data: T) => JSX.Element | string
}

export type ButtonProps = {
  onClick: () => void
  children: string
  variant?: 'outline' | 'ghost' | 'link' | 'solid'
}

export type TableButtons = {
  textButtons?: ButtonProps[]
  iconButtons?: IconButtonProps[]
}

export type ChartType = 'pie' | 'bar' | 'area'

export type ChartProps = {
  type: ChartType
  data: any[]
  sections?: any[]
  labelType?: LabelType
}

export type TableProps = ChakraTableProps & {
  data: any[]
  columns: ColumnProps<any>[]
  buttons?: TableButtons
  caption?: React.ReactNode
  isLoading?: boolean
  noSearch?: boolean
  onSearch?: (text: string, result: any[]) => void
  sortBy?: string
  charts?: ChartProps[]
  onViewChange?: (view: 'table' | ChartType) => void
}
