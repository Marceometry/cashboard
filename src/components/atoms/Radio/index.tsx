import { Radio as ChakraRadio, useRadioGroup, Stack } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Option[]
  direction?: 'row' | 'column'
}

export const Radio = ({ name, options, direction = 'row' }: Props) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })
  const { getRootProps, getRadioProps } = useRadioGroup({ ...field })

  return (
    <Stack direction={direction} gap='5' {...getRootProps()}>
      {options.map((option) => (
        <ChakraRadio
          key={option.value}
          {...getRadioProps({ value: option.value })}
        >
          {option.label}
        </ChakraRadio>
      ))}
    </Stack>
  )
}
