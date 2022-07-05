import { Radio as ChakraRadio, useRadioGroup, Stack } from '@chakra-ui/react'
import { useController } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Option[]
  control: any
  defaultValue?: string
  direction?: 'row' | 'column'
}

export const Radio = ({
  name,
  options,
  control,
  defaultValue,
  direction = 'row',
}: Props) => {
  const { field } = useController({ name, control, defaultValue })
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
