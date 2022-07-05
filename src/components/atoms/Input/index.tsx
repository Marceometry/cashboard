import { FieldError, UseFormRegister } from 'react-hook-form'
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputProps,
} from '@chakra-ui/react'

type Props = InputProps & {
  register: UseFormRegister<any>
  name: string
  label?: string
  type?: string
  helperText?: string
  required?: boolean
  error?: FieldError
}

export const Input = ({
  name,
  register,
  type,
  label,
  required,
  helperText,
  error,
  ...props
}: Props) => {
  return (
    <FormControl isInvalid={!!error?.message}>
      {label ? (
        <FormLabel htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </FormLabel>
      ) : (
        ''
      )}
      <ChakraInput
        id={name}
        type={type}
        {...register(name, {
          required: required ? 'Este campo é obrigatório' : '',
        })}
        {...props}
      />
      {helperText && !error ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        ''
      )}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
