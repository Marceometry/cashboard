import { useFormContext } from 'react-hook-form'
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'

export type CheckboxGroupProps = {
  name: string
  label: string
  defaultChecked?: boolean
}

export const Checkbox = ({
  name,
  label,
  defaultChecked,
}: CheckboxGroupProps) => {
  const { register } = useFormContext()

  return (
    <ChakraCheckbox
      w='fit-content'
      defaultChecked={defaultChecked}
      {...register(name)}
    >
      {label}
    </ChakraCheckbox>
  )
}
