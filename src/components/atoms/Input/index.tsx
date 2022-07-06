import { useFormContext } from 'react-hook-form'
import {
  Flex,
  Input as ChakraInput,
  InputProps,
  Tooltip,
} from '@chakra-ui/react'
import { FormControl, IconButton, IconButtonProps } from '@/components'

type Props = InputProps & {
  name: string
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  helperText?: string
  helperButton?: IconButtonProps
}

export const Input = ({
  name,
  type,
  label,
  placeholder,
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
          placeholder={placeholder || label}
          {...register(name, {
            required: required ? 'Este campo é obrigatório' : '',
          })}
          {...props}
        />
      </FormControl>
      {helperButton && (
        <Tooltip
          label={helperButton['aria-label']}
          openDelay={500}
          gutter={14}
          placement='top'
          hasArrow
        >
          <IconButton {...helperButton} mb={error ? 6 : 0} />
        </Tooltip>
      )}
    </Flex>
  )
}
