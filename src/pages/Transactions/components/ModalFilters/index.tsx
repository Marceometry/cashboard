import { useEffect, useMemo, useState } from 'react'
import {
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import {
  Accordion,
  CheckboxGroup,
  Input,
  FormModal,
  Select,
  Radio,
} from '@/components'
import { MONTH_LIST } from '@/constants'
import { useLocalStorage } from '@/hooks'
import { masks, sortAlphabetically } from '@/utils'
import { useTransactions } from '@/contexts'
import { defaultFilterValues, FilterModel } from '../../types'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterModel) => void
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const { categoryList: contextCategoryList, getAvailableYearList } =
    useTransactions()
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const storage = useLocalStorage()
  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
  const formMethods = useForm({
    defaultValues:
      storage.get('transactions-table-filters') || defaultFilterValues,
  })
  const selectedCategories = formMethods.watch('selectedCategories')
  const [isIndeterminate, setIsIndeterminate] = useState(true)
  const [allChecked, setAllChecked] = useState(true)

  useEffect(() => {
    const checkedAll = selectedCategories.length === categoryList.length
    const indeterminate = selectedCategories.length > 0 && !checkedAll
    setIsIndeterminate(indeterminate)
    setAllChecked(checkedAll)
  }, [formMethods, categoryList, selectedCategories])

  const handleClearFilters = () => {
    formMethods.setValue('type', 'all')
    formMethods.setValue('selectedMonth', null)
    formMethods.setValue('selectedYear', null)
    formMethods.setValue('maxAmount', '')
    formMethods.setValue('minAmount', '')
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }

  const handleSubmit = (data: FilterModel) => {
    handleFilter({
      ...data,
      selectedCategories: allChecked ? [] : data.selectedCategories,
    })
    onClose()
  }

  useEffect(() => {
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }, [categoryList])

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
              name='selectedMonth'
              placeholder='Selecione o mês'
              options={MONTH_LIST}
            />
            <Text>de</Text>
            <Select
              name='selectedYear'
              placeholder='Selecione o ano'
              options={getAvailableYearList()}
            />
          </Flex>
        </GridItem>

        <GridItem>
          <Flex gap='4' alignItems='flex-end'>
            <Input flex='1' name='minAmount' mask={masks.monetaryValue} />
            <Text>até</Text>
            <Input flex='1' name='maxAmount' mask={masks.monetaryValue} />
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

      <Center mt='4'>
        <Radio
          name='type'
          columns={3}
          options={[
            { label: 'Todas', value: 'all' },
            { label: 'Entrada', value: 'income' },
            { label: 'Saída', value: 'outcome' },
          ]}
        />
      </Center>
    </FormModal>
  )
}
