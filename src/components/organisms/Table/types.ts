import React from 'react'
import { TableProps as ChakraTableProps } from '@chakra-ui/react'
import { IconButtonProps } from '@/components'

export type ColumnProps<T> = {
  label: string
  field: keyof T | ''
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

export type TableProps = ChakraTableProps & {
  data: any[]
  columns: ColumnProps<any>[]
  buttons?: TableButtons
  caption?: React.ReactNode
  noSearch?: boolean
  sortBy?: string
  sortFunction?: (
    array: any[],
    oldestFirst?: boolean,
    dateField?: string
  ) => any[]
}
