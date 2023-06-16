import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Filter Transactions form //

export const filterTransactionsFormSchema = z.object({
  startDate: zodValidator.date.nullable(),
  endDate: zodValidator.date.nullable(),
  selectedMonth: z.string().nullable(),
  selectedYear: z.string().nullable(),
  selectedCategories: zodValidator.array,
  maxAmount: zodValidator.string,
  minAmount: zodValidator.string,
  showFutureTransactions: z.boolean(),
  paymentMethod: z.enum(['all', 'cash', 'pix', 'credit', 'debit']),
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
    startDate: null,
    endDate: null,
    selectedMonth: null,
    selectedYear: null,
    selectedCategories: [],
    maxAmount: '',
    minAmount: '',
    type: 'all',
    paymentMethod: 'all',
    showFutureTransactions: true,
  }
