import { useFormContext } from 'react-hook-form'
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'

type CheckboxGroupProps = {
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
      size={{ base: 'sm', sm: 'md' }}
      {...register(name)}
    >
      {label}
    </ChakraCheckbox>
  )
}
