import { useFormContext } from 'react-hook-form'
import {
  Flex,
  Input as ChakraInput,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { FormControl, IconButton, IconButtonProps } from '@/components'

type Props = InputProps & {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  helperText?: string
  rightIcon?: IconButtonProps
  flex?: string
  mask?: (value: string) => any
}

export const Input = ({
  name,
  label,
  placeholder,
  required,
  helperText,
  rightIcon,
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
        <InputGroup>
          <ChakraInput
            {...inputRegister}
            {...props}
            id={name}
            onChange={handleChange}
            placeholder={placeholder || mask?.('') || label}
          />
          {rightIcon && (
            <InputRightElement>
              <IconButton {...rightIcon} borderRadius={0} mb={error ? 6 : 0} />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </Flex>
  )
}
