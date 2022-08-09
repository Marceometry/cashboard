import { useEffect } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { masks } from '@/utils'
import { Input, Modal, Select } from '@/components'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { CategoriesFilterModel } from '@/contexts'
import { defaultEmptyFilterValues, FilterModel } from '../types'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: CategoriesFilterModel) => void
  isMonthDisabled: boolean
}

export const ModalFilters = ({
  isOpen,
  onClose,
  handleFilter,
  isMonthDisabled,
}: Props) => {
  const formMethods = useForm({
    defaultValues: defaultEmptyFilterValues,
  })

  const formatValues = (data: FilterModel) => ({
    minAmount: masks.unMaskMonetaryValue(data.minAmount),
    maxAmount: masks.unMaskMonetaryValue(data.maxAmount),
    month: Number(data.month),
    year: Number(data.year),
  })

  const handleSubmit = (data: FilterModel) => {
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
    if (isMonthDisabled) {
      formMethods.setValue('month', null)
      handleFilter(formatValues(formMethods.getValues()))
    }
  }, [isMonthDisabled])

  return (
    <Modal
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
              options={YEAR_LIST.map((item) => ({ label: item, value: item }))}
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
      </Grid>
    </Modal>
  )
}
