import {
  FormControl as ChakraFormControl,
  Flex,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'

type Props = FormControlProps & {
  children: React.ReactNode
  name: string
  label?: string
  helperElement?: React.ReactNode
  helperText?: string
  required?: boolean
  error?: string
}

export const FormControl = ({
  children,
  name,
  label,
  helperElement,
  required,
  helperText,
  error,
}: Props) => {
  return (
    <ChakraFormControl isInvalid={!!error}>
      {label && (
        <Flex justifyContent='space-between'>
          <FormLabel htmlFor={name}>
            {label}
            {required ? '*' : ''}
          </FormLabel>
        </Flex>
      )}
      {children}

      {helperElement}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  )
}
