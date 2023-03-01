import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Filter Categories form //

export const filterCategoriesFormSchema = z.object({
  month: z.string().nullable(),
  year: z.string().nullable(),
  selectedCategories: zodValidator.array,
  maxAmount: zodValidator.string,
  minAmount: zodValidator.string,
})

export const filterCategoriesFormResolver = zodResolver(
  filterCategoriesFormSchema
)

export type FilterCategoriesFormInputs = z.infer<
  typeof filterCategoriesFormSchema
>

export const filterCategoriesFormDefaultValues: FilterCategoriesFormInputs = {
  month: null,
  year: null,
  selectedCategories: [],
  maxAmount: '',
  minAmount: '',
}
