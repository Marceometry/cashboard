import { Center, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Input, MultiSelect, Radio } from '@/components'
import { CategoryModel, TagModel } from '@/contexts'
import { masks } from '@/utils'

type Props = {
  tagList: TagModel[]
  categoryList: CategoryModel[]
  handleOpenCategoriesModal: () => void
}

export const Form = ({
  tagList,
  categoryList,
  handleOpenCategoriesModal,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  return (
    <>
      <Grid
        templateColumns={isSmallScreen ? '1fr' : '1fr 1fr'}
        gap={isSmallScreen ? '2' : '4'}
      >
        <GridItem>
          <Input label='Descrição' name='description' required />
        </GridItem>
        <GridItem>
          <Input
            label='Valor'
            name='amount'
            required
            mask={masks.monetaryValue}
          />
        </GridItem>

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
        <GridItem>
          <Input label='Data' name='date' type='date' required />
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
