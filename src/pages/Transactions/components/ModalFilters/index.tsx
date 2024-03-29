import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Center,
  Checkbox as ChakraCheckbox,
  Flex,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Accordion,
  Checkbox,
  CheckboxGroup,
  FormOverlay,
  Input,
  Label,
  RadioGroup,
  Select,
  Switch,
} from '@/components'
import { MONTH_LIST } from '@/constants'
import { useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { paymentMethods } from '@/types'
import { currency, sortAlphabetically } from '@/utils'
import {
  filterTransactionsFormDefaultValues,
  FilterTransactionsFormInputs,
  filterTransactionsFormResolver,
} from '../../validation'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterTransactionsFormInputs) => void
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  const { categoryList: contextCategoryList, getAvailableYearList } =
    useTransactions()

  const storage = useLocalStorage()
  const storagedFilterValues = storage.get('transactions-table-filters')
  const formMethods = useForm<FilterTransactionsFormInputs>({
    resolver: filterTransactionsFormResolver,
    defaultValues: storagedFilterValues || filterTransactionsFormDefaultValues,
  })

  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
  const selectedCategories = formMethods.watch('selectedCategories')
  const [isIndeterminate, setIsIndeterminate] = useState(true)
  const [allChecked, setAllChecked] = useState(true)
  const [specificDate, setSpecificDate] = useState(false)

  const checkSpecificDate = (value: boolean) => {
    setSpecificDate(value)
    storage.set('transactions-table-filters-specific-date', value)
  }

  useEffect(() => {
    const checkedAll = selectedCategories.length === categoryList.length
    const indeterminate = selectedCategories.length > 0 && !checkedAll
    setIsIndeterminate(indeterminate)
    setAllChecked(checkedAll)
  }, [formMethods, categoryList, selectedCategories])

  const handleClearFilters = () => {
    if (!isOpen) return
    setSpecificDate(false)
    formMethods.setValue('type', 'all')
    formMethods.setValue('paymentMethod', 'all')
    formMethods.setValue('startDate', null)
    formMethods.setValue('endDate', null)
    formMethods.setValue('selectedMonth', null)
    formMethods.setValue('selectedYear', null)
    formMethods.setValue('showFutureTransactions', true)
    formMethods.setValue('maxAmount', '')
    formMethods.setValue('minAmount', '')
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }

  const handleSubmit = (data: FilterTransactionsFormInputs) => {
    handleFilter({
      ...data,
      startDate: specificDate ? data.startDate : null,
      endDate: specificDate ? data.endDate : null,
      selectedMonth: !specificDate ? data.selectedMonth : null,
      selectedYear: !specificDate ? data.selectedYear : null,
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
          <Flex alignItems='center' mb='4'>
            <Switch
              mr='2'
              id='specificDate'
              isChecked={specificDate}
              onChange={(e) => checkSpecificDate(e.target.checked)}
            />
            <Label
              m='0'
              htmlFor='specificDate'
              userSelect='none'
              cursor='pointer'
            >
              Selecionar intervalo de data específico
            </Label>
          </Flex>

          {specificDate ? (
            <Flex gap='4' alignItems='flex-end'>
              <Input flex='1' type='date' name='startDate' required={false} />
              <Text>até</Text>
              <Input flex='1' type='date' name='endDate' required={false} />
            </Flex>
          ) : (
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
          )}
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
        </GridItem>
      </Grid>

      <Center pt='4'>
        <Checkbox
          label='Mostrar transações futuras'
          name='showFutureTransactions'
          defaultChecked={
            storagedFilterValues?.showFutureTransactions !== false
          }
        />
      </Center>
    </FormOverlay>
  )
}
