import { useEffect, useMemo, useState } from 'react'
import { Checkbox, Grid, GridItem } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CheckboxGroup, Modal, Select } from '@/components'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { useTransactions } from '@/contexts'
import { FilterModel } from '../types'
import { defaultFilterValues } from '..'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterModel) => void
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const { categoryList } = useTransactions()
  const formMethods = useForm({ defaultValues: defaultFilterValues })
  const selectedCategories = formMethods.watch('selectedCategories')
  const [isIndeterminate, setIsIndeterminate] = useState(true)
  const [allChecked, setAllChecked] = useState(true)

  useEffect(() => {
    const checkedAll = selectedCategories.length === categoryList.length
    const indeterminate = selectedCategories.length > 0 && !checkedAll
    setIsIndeterminate(indeterminate)
    setAllChecked(checkedAll)
  }, [formMethods, categoryList, selectedCategories])

  const handleSubmit = (data: FilterModel) => {
    handleFilter(data)
    onClose()
  }

  useEffect(() => {
    formMethods.setValue(
      'selectedCategories',
      categoryList.map((item) => item.name)
    )
  }, [categoryList])

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

      <Grid mt='6' mb='2'>
        <Checkbox
          mb='4'
          w='fit-content'
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) =>
            formMethods.setValue(
              'selectedCategories',
              e.target.checked ? categoryList.map((item) => item.name) : []
            )
          }
        >
          Todas as categorias
        </Checkbox>

        <CheckboxGroup
          name='selectedCategories'
          columns={3}
          defaultCheckAll
          options={categoryList.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
        />
      </Grid>
    </Modal>
  )
}
