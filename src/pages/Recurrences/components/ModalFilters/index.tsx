import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Checkbox as ChakraCheckbox,
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Accordion,
  CheckboxGroup,
  FormOverlay,
  Input,
  RadioGroup,
} from '@/components'
import { useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { paymentMethods } from '@/types'
import { currency, sortAlphabetically } from '@/utils'
import {
  filterRecurrencesFormDefaultValues,
  FilterRecurrencesFormInputs,
  filterRecurrencesFormResolver,
} from '../../validation'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterRecurrencesFormInputs) => void
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  const { categoryList: contextCategoryList } = useTransactions()

  const storage = useLocalStorage()
  const storagedFilterValues = storage.get('recurrences-table-filters')
  const formMethods = useForm<FilterRecurrencesFormInputs>({
    resolver: filterRecurrencesFormResolver,
    defaultValues: storagedFilterValues || filterRecurrencesFormDefaultValues,
  })

  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
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
    if (!isOpen) return
    formMethods.setValue('type', 'all')
    formMethods.setValue('status', 'all')
    formMethods.setValue('paymentMethod', 'all')
    formMethods.setValue('startDate', null)
    formMethods.setValue('endDate', null)
    formMethods.setValue('maxAmount', '')
    formMethods.setValue('minAmount', '')
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }

  const handleSubmit = (data: FilterRecurrencesFormInputs) => {
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
    <FormOverlay
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
            <Input flex='1' type='date' name='startDate' required={false} />
            <Text>até</Text>
            <Input flex='1' type='date' name='endDate' required={false} />
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
                <ChakraCheckbox
                  w='fit-content'
                  size={{ base: 'sm', sm: 'md' }}
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
                </ChakraCheckbox>
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

      <Grid templateColumns={isSmallScreen ? '1fr' : '1fr 1fr'} gap='4' mt='3'>
        <GridItem>
          <RadioGroup
            name='paymentMethod'
            label='Métodos de pagamento'
            options={[
              { label: 'Todos', value: 'all' },
              ...paymentMethods
                .filter((item) => item[0] !== 'other')
                .map(([value, label]) => ({ value, label })),
            ]}
          />
        </GridItem>

        <GridItem>
          <RadioGroup
            name='type'
            label='Tipos'
            options={[
              { label: 'Todas', value: 'all' },
              { label: 'Entrada', value: 'income' },
              { label: 'Saída', value: 'outcome' },
            ]}
          />
          <Box mt='4'>
            <RadioGroup
              name='status'
              label='Status'
              options={[
                { label: 'Todos', value: 'all' },
                { label: 'Ativo', value: 'active' },
                { label: 'Inativo', value: 'inactive' },
              ]}
            />
          </Box>
        </GridItem>
      </Grid>
    </FormOverlay>
  )
}
