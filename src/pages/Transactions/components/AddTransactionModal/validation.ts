import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { formatDateToInput, zodValidator } from '@/utils'

// Add Transaction form //

export const addTransactionFormSchema = z.object({
  description: zodValidator.required,
  category: zodValidator.string,
  amount: zodValidator.required,
  tags: zodValidator.array,
  date: zodValidator.date,
  datePayed: zodValidator.date.nullable(),
  type: z.enum(['income', 'outcome']),
})

export const addTransactionFormResolver = zodResolver(addTransactionFormSchema)

export type AddTransactionFormInputs = z.infer<typeof addTransactionFormSchema>

export const addTransactionFormDefaultValues: AddTransactionFormInputs = {
  amount: '',
  category: '',
  description: '',
  type: 'outcome',
  tags: [],
  date: formatDateToInput(new Date()),
  datePayed: formatDateToInput(new Date()),
}

// Category modal form //

export const categoryFormSchema = z.object({
  category: zodValidator.string,
})

export type CategoryFormInputs = z.infer<typeof categoryFormSchema>
