import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Center,
  Checkbox,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Input, MultiSelect, Radio } from '@/components'
import { useTransactions } from '@/contexts'
import { paymentMethods } from '@/types'
import { currency } from '@/utils'
import { AddTransactionFormInputs } from './validation'

type Props = {
  isEditingTransaction: boolean
  handleOpenCategoriesModal: () => void
  differentPaymentDate: boolean
  setDifferentPaymentDate: (value: boolean) => void
}

export const Form = ({
  isEditingTransaction,
  handleOpenCategoriesModal,
  differentPaymentDate,
  setDifferentPaymentDate,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })
  const { categoryList, tagList, getFilteredMostRepeatedTransactions } =
    useTransactions()
  const { watch, setValue } = useFormContext<AddTransactionFormInputs>()
  const descriptionDatalist = !isEditingTransaction
    ? getFilteredMostRepeatedTransactions(watch('description'))
    : []

  useEffect(() => {
    if (isEditingTransaction) return
    const description = watch('description')

    const item = descriptionDatalist.find(
      (item) => item.description === description
    )
    if (!item) return

    setValue('category', item.category)
    setValue('amount', currency.maskMonetaryValue(item.amount))
    setValue('type', item.type)
    setValue('paymentMethod', item.paymentMethod)
  }, [watch('description')])

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

        <GridItem>
          <Input
            type='date'
            name='date'
            label='Data'
            required
            helperElement={
              <Checkbox
                mt='1'
                size='sm'
                w='fit-content'
                flexDir='row-reverse'
                spacing={0}
                gap={2}
                onChange={(e) => setDifferentPaymentDate(e.target.checked)}
                isChecked={differentPaymentDate}
              >
                Pagamento em outra data
              </Checkbox>
            }
          />

          <Input
            type='date'
            name='datePayed'
            label='Data do Pagamento'
            containerProps={{ mt: '2' }}
            isDisabled={!differentPaymentDate}
          />
        </GridItem>
        <GridItem>
          <Input
            label='Categoria'
            name='category'
            mb='4'
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

          <Radio
            rowGap={3}
            columnGap={5}
            name='paymentMethod'
            label='Método de pagamento'
            required
            options={paymentMethods.map(([value, label]) => ({
              value,
              label,
            }))}
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
