import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { getMonth, getYear } from 'date-fns'
import { Modal, Select } from '@/components'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { useForm } from 'react-hook-form'
import { FilterModel } from '../types'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterModel) => void
}

const defaultValues = {
  selectedMonth: getMonth(new Date()) + 1,
  selectedYear: getYear(new Date()),
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const formMethods = useForm({ defaultValues })

  const handleSubmit = (data: FilterModel) => {
    handleFilter(data)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
      formMethods={formMethods}
      title='Selecionar Filtros'
      maxWidth={450}
    >
      <Grid templateColumns='1fr 1fr' gap='4'>
        <GridItem>
          <Select w='auto' name='selectedMonth' options={MONTH_LIST} />
        </GridItem>
        <GridItem>
          <Select
            w='auto'
            name='selectedYear'
            options={YEAR_LIST.map((item) => ({ label: item, value: item }))}
          />
        </GridItem>
      </Grid>
    </Modal>
  )
}
