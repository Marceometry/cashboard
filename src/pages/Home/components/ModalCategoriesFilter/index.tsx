import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useBreakpointValue } from '@chakra-ui/react'
import { CheckboxGroup, FormModal } from '@/components'
import { useTransactions } from '@/contexts'
import { sortAlphabetically } from '@/utils'
import {
  CategoriesAverageOutcomeFormInputs,
  categoriesAverageOutcomeFormResolver,
} from './validation'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: string[]) => void
  currentSelectedCategories: string[]
}

export const ModalCategoriesFilter = ({
  isOpen,
  onClose,
  handleFilter,
  currentSelectedCategories,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  const { categoryList: contextCategoryList } = useTransactions()
  const formMethods = useForm<CategoriesAverageOutcomeFormInputs>({
    resolver: categoriesAverageOutcomeFormResolver,
    defaultValues: { selectedCategories: currentSelectedCategories },
  })

  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
  const selectedCategories = formMethods.watch('selectedCategories')

  const handleSubmit = (data: CategoriesAverageOutcomeFormInputs) => {
    console.log(data)
    handleFilter(data.selectedCategories)
    onClose()
  }

  useEffect(() => {
    formMethods.setValue('selectedCategories', currentSelectedCategories)
  }, [categoryList])

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      formMethods={formMethods}
      title='Selecionar Categorias'
    >
      <CheckboxGroup
        name='selectedCategories'
        columns={isSmallScreen ? 2 : 3}
        defaultCheckAll
        options={categoryList.map((item) => ({
          label: item.name,
          value: item.name,
          disabled:
            selectedCategories.length === 5 &&
            !selectedCategories.includes(item.name),
        }))}
      />
    </FormModal>
  )
}
