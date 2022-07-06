import { Radio as ChakraRadio, useRadioGroup, Grid } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Option[]
  columns?: number
  required?: boolean
}

export const Radio = ({ name, options, columns = 2, required }: Props) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control, rules: { required } })
  const { getRootProps, getRadioProps } = useRadioGroup({ ...field })

  return (
    <Grid
      gap='5'
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
  )
}
