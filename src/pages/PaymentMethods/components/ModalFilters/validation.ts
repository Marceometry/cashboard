import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Filter Payment Methods form //

export const filterPaymentMethodsFormSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable(),
  maxAmount: zodValidator.string,
  minAmount: zodValidator.string,
})

export const filterPaymentMethodsFormResolver = zodResolver(
  filterPaymentMethodsFormSchema
)

export type FilterPaymentMethodsFormInputs = z.infer<
  typeof filterPaymentMethodsFormSchema
>

export const filterPaymentMethodsFormDefaultValues: FilterPaymentMethodsFormInputs =
  {
    month: null,
    year: null,
    maxAmount: '',
    minAmount: '',
  }
