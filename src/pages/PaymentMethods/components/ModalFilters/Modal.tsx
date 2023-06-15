import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { FormModal, Input, Select } from '@/components'
import { MONTH_LIST } from '@/constants'
import { useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { PaymentMethodsFilterModel } from '@/types'
import { currency } from '@/utils'
import {
  filterPaymentMethodsFormDefaultValues,
  FilterPaymentMethodsFormInputs,
} from './validation'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: PaymentMethodsFilterModel) => void
  isMonthDisabled: boolean
}

const getDefaultFormValues = (data: FilterPaymentMethodsFormInputs) => {
  return data
    ? {
        minAmount: currency.valueToMoney(Number(data.minAmount)),
        maxAmount: currency.valueToMoney(Number(data.maxAmount)),
        month: data.month || null,
        year: data.year || null,
      }
    : filterPaymentMethodsFormDefaultValues
}

export const ModalFilters = ({
  isOpen,
  onClose,
  handleFilter,
  isMonthDisabled,
}: Props) => {
  const storage = useLocalStorage()
  const { getAvailableYearList } = useTransactions()
  const formMethods = useForm({
    defaultValues: getDefaultFormValues(storage.get('categories-page-filters')),
  })

  const formatValues = (data: FilterPaymentMethodsFormInputs) => ({
    minAmount: currency.unMaskMonetaryValue(data.minAmount),
    maxAmount: currency.unMaskMonetaryValue(data.maxAmount),
    month: Number(data.month),
    year: Number(data.year),
  })

  const handleSubmit = (data: FilterPaymentMethodsFormInputs) => {
    handleFilter(formatValues(data))
    onClose()
  }

  const handleClearFilters = () => {
    formMethods.setValue('month', null)
    formMethods.setValue('year', null)
    formMethods.setValue('maxAmount', '')
    formMethods.setValue('minAmount', '')
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
      </Grid>
    </FormModal>
  )
}
