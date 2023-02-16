import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Accordion,
  CheckboxGroup,
  FormModal,
  Input,
  Select,
} from '@/components'
import { MONTH_LIST } from '@/constants'
import { CategoriesFilterModel, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { currency, sortAlphabetically } from '@/utils'
import {
  filterCategoriesFormDefaultValues,
  FilterCategoriesFormInputs,
} from './validation'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: CategoriesFilterModel) => void
  isMonthDisabled: boolean
}

const getDefaultFormValues = (data: FilterCategoriesFormInputs) => {
  return data
    ? {
        minAmount: currency.valueToMoney(Number(data.minAmount)),
        maxAmount: currency.valueToMoney(Number(data.maxAmount)),
        month: data.month || null,
        year: data.year || null,
        selectedCategories: data.selectedCategories || [],
      }
    : filterCategoriesFormDefaultValues
}

export const ModalFilters = ({
  isOpen,
  onClose,
  handleFilter,
  isMonthDisabled,
}: Props) => {
  const storage = useLocalStorage()
  const { categoryList: contextCategoryList, getAvailableYearList } =
    useTransactions()
  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
  const formMethods = useForm({
    defaultValues: getDefaultFormValues(storage.get('categories-page-filters')),
  })
  const selectedCategories = formMethods.watch('selectedCategories')
  const [isIndeterminate, setIsIndeterminate] = useState(true)
  const [allChecked, setAllChecked] = useState(true)
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  useEffect(() => {
    const checkedAll = selectedCategories.length === categoryList.length
    const indeterminate = selectedCategories.length > 0 && !checkedAll
    setIsIndeterminate(indeterminate)
    setAllChecked(checkedAll)
  }, [formMethods, categoryList, selectedCategories])

  useEffect(() => {
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }, [categoryList])

  const formatValues = (data: FilterCategoriesFormInputs) => ({
    minAmount: currency.unMaskMonetaryValue(data.minAmount),
    maxAmount: currency.unMaskMonetaryValue(data.maxAmount),
    month: Number(data.month),
    year: Number(data.year),
    selectedCategories: allChecked ? [] : data.selectedCategories,
  })

  const handleSubmit = (data: FilterCategoriesFormInputs) => {
    handleFilter(formatValues(data))
    onClose()
  }

  const handleClearFilters = () => {
    formMethods.setValue('month', null)
    formMethods.setValue('year', null)
    formMethods.setValue('maxAmount', '')
    formMethods.setValue('minAmount', '')
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }

  useEffect(() => {
    if (!isMonthDisabled) return
    formMethods.setValue('month', null)
    handleFilter(formatValues(formMethods.getValues()))
  }, [isMonthDisabled])

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      formMethods={formMethods}
      title='Selecionar Filtros'
      extraButton={{
        children: 'Limpar Filtros',
        onClick: handleClearFilters,
      }}
    >
      <Grid gap='4'>
        <GridItem>
          <Flex gap='4' alignItems='flex-end'>
            <Select
              name='month'
              placeholder='Selecione o mês'
              options={MONTH_LIST}
              isDisabled={isMonthDisabled}
            />
            <Text>de</Text>
            <Select
              name='year'
              placeholder='Selecione o ano'
              options={getAvailableYearList()}
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Flex gap='4' alignItems='flex-end'>
            <Input
              flex='1'
              name='minAmount'
              mask={currency.maskMonetaryValue}
            />
            <Text>até</Text>
            <Input
              flex='1'
              name='maxAmount'
              mask={currency.maskMonetaryValue}
            />
          </Flex>
        </GridItem>

        <Accordion
          items={[
            {
              key: 1,
              button: (
                <Checkbox
                  w='fit-content'
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    formMethods.setValue(
                      'selectedCategories',
                      e.target.checked
                        ? categoryList.map((item) => item.name)
                        : []
                    )
                  }
                >
                  Todas as categorias
                </Checkbox>
              ),
              panel: (
                <CheckboxGroup
                  name='selectedCategories'
                  columns={isSmallScreen ? 2 : 3}
                  defaultCheckAll
                  options={categoryList.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              ),
            },
          ]}
        />
      </Grid>
    </FormModal>
  )
}
