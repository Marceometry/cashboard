import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'

type Props = FormControlProps & {
  children: React.ReactNode
  name: string
  label?: string
  helperText?: string
  required?: boolean
  error?: string
}

export const FormControl = ({
  children,
  name,
  label,
  required,
  helperText,
  error,
}: Props) => {
  return (
    <ChakraFormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name}>
          {label}
          {required ? '*' : ''}
        </FormLabel>
      )}
      {children}

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  )
}
