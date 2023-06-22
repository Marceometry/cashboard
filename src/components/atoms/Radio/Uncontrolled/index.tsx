import { useController, useFormContext } from 'react-hook-form'
import { Radio as ChakraRadio, useRadioGroup } from '@chakra-ui/react'
import { Label } from '@/components'
import { RadioOption } from '..'
import { Container } from './Container'

type Props = {
  options: RadioOption[]
  name?: string
  label?: string
  gap?: number | string
  rowGap?: number | string
  columnGap?: number | string
  columns?: number
  required?: boolean
}

export const UncontrolledRadioGroup = ({
  name = 'uncontrolled-radio-group',
  options,
  label,
  required,
  columns,
  gap,
  rowGap,
  columnGap,
}: Props) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control, rules: { required } })
  const { getRootProps, getRadioProps } = useRadioGroup({ ...field })

  return (
    <>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      )}
      <Container
        gap={gap}
        rowGap={rowGap}
        columnGap={columnGap}
        columns={columns}
        rootProps={getRootProps()}
      >
        {options.map((option) => (
          <ChakraRadio
            key={option.value}
            size={{ base: 'sm', sm: 'md' }}
            {...getRadioProps({ value: option.value })}
          >
            {option.label}
          </ChakraRadio>
        ))}
      </Container>
    </>
  )
}
