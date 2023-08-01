import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Filter Recurrences form //

export const filterRecurrencesFormSchema = z.object({
  startDate: zodValidator.date.nullable(),
  endDate: zodValidator.date.nullable(),
  selectedCategories: zodValidator.array,
  maxAmount: zodValidator.string,
  minAmount: zodValidator.string,
  paymentMethod: z.enum(['all', 'cash', 'pix', 'credit', 'debit']),
  status: z.enum(['all', 'active', 'inactive']),
  type: z.enum(['all', 'income', 'outcome']),
})

export const filterRecurrencesFormResolver = zodResolver(
  filterRecurrencesFormSchema
)

export type FilterRecurrencesFormInputs = z.infer<
  typeof filterRecurrencesFormSchema
>

export const filterRecurrencesFormDefaultValues: FilterRecurrencesFormInputs = {
  startDate: null,
  endDate: null,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
  type: 'all',
  status: 'all',
  paymentMethod: 'all',
}
