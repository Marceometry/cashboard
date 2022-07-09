import { useFormContext } from 'react-hook-form'
import { Flex, Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { FormControl, IconButton, IconButtonProps } from '@/components'

type Props = InputProps & {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  helperText?: string
  helperButton?: IconButtonProps
  flex?: string
  mask?: (value: string) => any
}

export const Input = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  helperButton,
  mask,
  flex,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]?.message as string | undefined

  const inputRegister = register(name, {
    required: required ? 'Este campo é obrigatório' : '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) e.target.value = mask(e.target.value)
    inputRegister.onChange(e)
  }

  return (
    <Flex alignItems='flex-end' gap='2' flex={flex}>
      <FormControl
        name={name}
        label={label}
        error={error}
        required={required}
        helperText={helperText}
      >
        <ChakraInput
          {...inputRegister}
          {...props}
          id={name}
          onChange={handleChange}
          placeholder={placeholder || mask?.('') || label}
        />
      </FormControl>
      {helperButton && <IconButton {...helperButton} mb={error ? 6 : 0} />}
    </Flex>
  )
}
