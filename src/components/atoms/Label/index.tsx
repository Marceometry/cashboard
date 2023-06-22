import { FormLabel, FormLabelProps } from '@chakra-ui/react'

type Props = FormLabelProps & {
  disabled?: boolean
  required?: boolean
}

export const Label = ({ children, disabled, required, ...props }: Props) => (
  <FormLabel
    opacity={disabled ? 0.4 : 1}
    cursor={disabled ? 'not-allowed' : 'default'}
    fontSize={{ base: 'sm', sm: 'md' }}
    {...props}
  >
    {children}
    {required ? '*' : ''}
  </FormLabel>
)
