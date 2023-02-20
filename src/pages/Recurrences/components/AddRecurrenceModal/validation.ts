import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { formatDateToInput, zodValidator } from '@/utils'

// Add Recurrence form //

export const addRecurrenceFormSchema = z.object({
  description: zodValidator.required,
  category: zodValidator.string,
  amount: zodValidator.required,
  tags: zodValidator.array,
  startDate: zodValidator.date,
  installments: z.string().nullable(),
  type: z.enum(['income', 'outcome']),
})

export const addRecurrenceFormResolver = zodResolver(addRecurrenceFormSchema)

export type AddRecurrenceFormInputs = z.infer<typeof addRecurrenceFormSchema>

export const addRecurrenceFormDefaultValues: AddRecurrenceFormInputs = {
  amount: '',
  category: '',
  description: '',
  type: 'outcome',
  tags: [],
  startDate: formatDateToInput(new Date()),
  installments: null,
}

// Category modal form //

export const categoryFormSchema = z.object({
  category: zodValidator.string,
})

export type CategoryFormInputs = z.infer<typeof categoryFormSchema>
