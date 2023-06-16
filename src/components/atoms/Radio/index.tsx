import { useController, useFormContext } from 'react-hook-form'
import {
  Radio as ChakraRadio,
  FormLabel,
  useRadioGroup,
} from '@chakra-ui/react'
import { Container } from './Container'

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
  columns,
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
            {...getRadioProps({ value: option.value })}
          >
            {option.label}
          </ChakraRadio>
        ))}
      </Container>
    </>
  )
}
