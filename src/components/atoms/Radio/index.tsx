import { useController, useFormContext } from 'react-hook-form'
import {
  Radio as ChakraRadio,
  FormLabel,
  Grid,
  useRadioGroup,
} from '@chakra-ui/react'

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Option[]
  label?: string
  gap?: number | string
  rowGap?: number | string
  columnGap?: number | string
  columns?: number
  required?: boolean
}

export const Radio = ({
  name,
  options,
  label,
  required,
  columns = 2,
  gap = 5,
  rowGap,
  columnGap,
}: Props) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control, rules: { required } })
  const { getRootProps, getRadioProps } = useRadioGroup({ ...field })

  return (
    <>
      {label && (
        <FormLabel htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </FormLabel>
      )}
      <Grid
        gap={gap}
        rowGap={rowGap}
        columnGap={columnGap}
        templateColumns={`repeat(${columns}, 1fr)`}
        {...getRootProps()}
      >
        {options.map((option) => (
          <ChakraRadio
            key={option.value}
            {...getRadioProps({ value: option.value })}
          >
            {option.label}
          </ChakraRadio>
        ))}
      </Grid>
    </>
  )
}
