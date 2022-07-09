import { useEffect, useMemo, useState } from 'react'
import { Checkbox, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Accordion, CheckboxGroup, Input, Modal, Select } from '@/components'
import { MONTH_LIST, YEAR_LIST } from '@/constants'
import { useTransactions } from '@/contexts'
import { masks, sortAlphabetically } from '@/utils'
import { defaultFilterValues, FilterModel } from '../constants'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleFilter: (data: FilterModel) => void
}

export const ModalFilters = ({ isOpen, onClose, handleFilter }: Props) => {
  const { categoryList: contextCategoryList } = useTransactions()
  const categoryList = useMemo(
    () => sortAlphabetically(contextCategoryList, 'name'),
    [contextCategoryList]
  )
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
            <Select name='selectedMonth' options={MONTH_LIST} />
            <Text>de</Text>
            <Select
              name='selectedYear'
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
                  columns={3}
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
    </Modal>
  )
}
