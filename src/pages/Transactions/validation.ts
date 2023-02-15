import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Filter Transactions form //

export const filterTransactionsFormSchema = z.object({
  selectedMonth: z.string().nullable(),
  selectedYear: z.string().nullable(),
  selectedCategories: zodValidator.array,
  maxAmount: zodValidator.string,
  minAmount: zodValidator.string,
  type: z.enum(['all', 'income', 'outcome']),
})

export const filterTransactionsFormResolver = zodResolver(
  filterTransactionsFormSchema
)

export type FilterTransactionsFormInputs = z.infer<
  typeof filterTransactionsFormSchema
>

export const filterTransactionsFormDefaultValues: FilterTransactionsFormInputs =
  {
    selectedMonth: null,
    selectedYear: null,
    selectedCategories: [],
    maxAmount: '',
    minAmount: '',
    type: 'all',
  }
