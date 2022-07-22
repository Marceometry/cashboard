import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Modal, Select } from '@/components'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { defaultFilterValues, FilterModel } from '../constants'
import { useEffect } from 'react'

type Props = {
  isMonthFilterDisabled: boolean
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterModel) => void
}

export const ModalFilters = ({
  isOpen,
  onClose,
  handleFilter,
  isMonthFilterDisabled,
}: Props) => {
  const formMethods = useForm({
    defaultValues: defaultFilterValues,
  })

  const handleSubmit = (data: FilterModel) => {
    handleFilter({
      month: Number(data.month),
      year: Number(data.year),
    })
    onClose()
  }

  useEffect(() => {
    if (!isMonthFilterDisabled) return
    formMethods.setValue('month', null)
  }, [isMonthFilterDisabled])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      formMethods={formMethods}
      title='Selecionar Filtros'
    >
      <Grid gap='4'>
        <GridItem>
          <Flex gap='4' alignItems='flex-end'>
            <Select
              placeholder='Selecione o mês'
              name='month'
              options={MONTH_LIST}
              isDisabled={isMonthFilterDisabled}
            />
            <Text>de</Text>
            <Select
              placeholder='Selecione o ano'
              name='year'
              options={YEAR_LIST.map((item) => ({ label: item, value: item }))}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Modal>
  )
}
