import { useFormContext } from 'react-hook-form'
import { Flex, Input as ChakraInput, InputProps } from '@chakra-ui/react'
import { FormControl, IconButton, IconButtonProps } from '@/components'

type Props = InputProps & {
  name: string
  label?: string
  type?: string
  required?: boolean
  helperText?: string
  helperButton?: IconButtonProps
}

export const Input = ({
  name,
  type,
  label,
  required,
  helperText,
  helperButton,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]?.message as string | undefined

  return (
    <Flex alignItems='flex-end' gap='2'>
      <FormControl name={name} label={label} error={error}>
        <ChakraInput
          id={name}
          type={type}
          {...register(name, {
            required: required ? 'Este campo é obrigatório' : '',
          })}
          {...props}
        />
      </FormControl>
      {helperButton && <IconButton {...helperButton} mb={error ? 6 : 0} />}
    </Flex>
  )
}
