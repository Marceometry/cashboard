import { FieldError, useFormContext } from 'react-hook-form'
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputProps,
} from '@chakra-ui/react'

type Props = InputProps & {
  name: string
  label?: string
  type?: string
  helperText?: string
  required?: boolean
}

export const Input = ({
  name,
  type,
  label,
  required,
  helperText,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]

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
      {typeof error?.message === 'string' && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}
