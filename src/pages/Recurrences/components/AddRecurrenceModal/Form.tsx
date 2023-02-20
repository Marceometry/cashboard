import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Center, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Input, MultiSelect, Radio } from '@/components'
import { useTransactions } from '@/contexts'
import { currency } from '@/utils'
import { AddRecurrenceFormInputs } from './validation'

type Props = {
  isEditingTransaction: boolean
  handleOpenCategoriesModal: () => void
}

export const Form = ({
  isEditingTransaction,
  handleOpenCategoriesModal,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { categoryList, tagList, getFilteredMostRepeatedTransactions } =
    useTransactions()
  const { watch, setValue } = useFormContext<AddRecurrenceFormInputs>()

  const description = !isEditingTransaction ? watch('description') : ''
  const descriptionDatalist = !isEditingTransaction
    ? getFilteredMostRepeatedTransactions(description)
    : []

  useEffect(() => {
    if (isEditingTransaction) return

    const item = descriptionDatalist.find(
      (item) => item.description === description
    )
    if (!item) return

    setValue('category', item.category)
    setValue('amount', currency.maskMonetaryValue(item.amount))
    setValue('type', item.type)
  }, [description, descriptionDatalist, isEditingTransaction])

  return (
    <>
      <Grid
        templateColumns={isSmallScreen ? '1fr' : '1fr 1fr'}
        gap={isSmallScreen ? '2' : '4'}
      >
        <GridItem>
          <Input
            label='Descrição'
            name='description'
            autoComplete='off'
            datalist={descriptionDatalist.map((item) => item.description)}
            required
          />
        </GridItem>
        <GridItem>
          <Input
            autoComplete='off'
            label='Valor'
            name='amount'
            mask={currency.maskMonetaryValue}
            required
          />
        </GridItem>

        <Grid gridTemplateColumns='1fr 1fr' gap=' 4'>
          <GridItem>
            <Input
              label='Data de início'
              name='startDate'
              type='date'
              required
              isDisabled={isEditingTransaction}
            />
          </GridItem>
          <GridItem>
            <Input
              label='Parcelas'
              name='installments'
              type='number'
              isDisabled={isEditingTransaction}
            />
          </GridItem>
        </Grid>
        <GridItem>
          <Input
            label='Categoria'
            name='category'
            rightIcon={
              categoryList.length
                ? {
                    icon: 'list',
                    'aria-label': 'Selecionar Categoria',
                    onClick: handleOpenCategoriesModal,
                  }
                : undefined
            }
          />
        </GridItem>
      </Grid>

      <Center w='full' mt='4' mb='6' position='relative'>
        <MultiSelect
          name='tags'
          label='Tags'
          placeholder='Selecionar tags'
          options={tagList.map((tag) => ({
            label: tag.name,
            value: tag.name,
          }))}
        />
      </Center>

      <Center>
        <Radio
          name='type'
          options={[
            { label: 'Entrada', value: 'income' },
            { label: 'Saída', value: 'outcome' },
          ]}
        />
      </Center>
    </>
  )
}
