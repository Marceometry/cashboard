import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { zodValidator } from '@/utils'

// Categories average outcome form //

export const categoriesAverageOutcomeFormSchema = z.object({
  selectedCategories: zodValidator.array,
})

export const categoriesAverageOutcomeFormResolver = zodResolver(
  categoriesAverageOutcomeFormSchema
)

export type CategoriesAverageOutcomeFormInputs = z.infer<
  typeof categoriesAverageOutcomeFormSchema
>

export const categoriesAverageOutcomeFormDefaultValues: CategoriesAverageOutcomeFormInputs =
  {
    selectedCategories: [],
  }
