import { useController, useFormContext } from 'react-hook-form'
import { Checkbox, Grid, useCheckboxGroup } from '@chakra-ui/react'

type Option = {
  label: string
  value: string
  defaultChecked?: boolean
  disabled?: boolean
}

type Props = {
  name: string
  options: Option[]
  columns?: number
  required?: boolean
  defaultCheckAll?: boolean
}

export const CheckboxGroup = ({
  name,
  options,
  columns = 2,
  required,
  defaultCheckAll,
}: Props) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control, rules: { required } })
  const { getCheckboxProps } = useCheckboxGroup({ ...field })

  return (
    <Grid
      gap={{ base: '2', sm: '4' }}
      templateColumns={`repeat(${columns}, 1fr)`}
    >
      {options.map((option) => (
        <Checkbox
          w='fit-content'
          key={option.value}
          defaultChecked={option.defaultChecked ?? defaultCheckAll}
          disabled={option.disabled}
          size={{ base: 'sm', sm: 'md' }}
          {...getCheckboxProps({ value: option.value })}
        >
          {option.label}
        </Checkbox>
      ))}
    </Grid>
  )
}
