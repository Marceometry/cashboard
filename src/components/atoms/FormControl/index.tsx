import {
  FormControl as ChakraFormControl,
  Flex,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Label } from '@/components'

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
  isDisabled,
}: Props) => {
  return (
    <ChakraFormControl isInvalid={!!error}>
      {label && (
        <Flex justifyContent='space-between'>
          <Label htmlFor={name} disabled={isDisabled} required={required}>
            {label}
          </Label>
        </Flex>
      )}
      {children}

      {helperElement}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </ChakraFormControl>
  )
}
