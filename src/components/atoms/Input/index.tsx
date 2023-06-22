import { useFormContext } from 'react-hook-form'
import {
  Input as ChakraInput,
  Flex,
  FlexProps,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { FormControl, IconButton, IconButtonProps } from '@/components'

type Props = InputProps & {
  name: string
  label?: string
  helperElement?: React.ReactNode
  placeholder?: string
  required?: boolean
  helperText?: string
  rightIcon?: IconButtonProps
  flex?: string
  datalist?: string[]
  mask?: (value: string) => any
  containerProps?: FlexProps
}

export const Input = ({
  name,
  label,
  helperElement,
  placeholder,
  required,
  helperText,
  rightIcon,
  mask,
  datalist,
  flex,
  containerProps,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]?.message as string | undefined

  const hasDatalist = !!datalist?.length
  const datalistName = `${name}-datalist`

  const inputRegister = register(name)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) e.target.value = mask(e.target.value)
    inputRegister.onChange(e)
  }

  return (
    <Flex flex={flex} {...containerProps}>
      <FormControl
        name={name}
        label={label}
        helperElement={helperElement}
        error={error}
        required={required}
        helperText={helperText}
        isDisabled={props.isDisabled}
      >
        <InputGroup size={{ base: 'sm', sm: 'md' }}>
          <ChakraInput
            {...inputRegister}
            {...props}
            id={name}
            onChange={handleChange}
            placeholder={placeholder || mask?.('') || label}
            list={hasDatalist ? datalistName : undefined}
          />
          {rightIcon && (
            <InputRightElement>
              <IconButton
                {...rightIcon}
                size={{ base: 'sm', sm: 'md' }}
                borderRadius={{ base: 'sm', sm: 'md' }}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                mb={error ? 6 : 0}
              />
            </InputRightElement>
          )}

          {!!datalist?.length && (
            <datalist id={datalistName}>
              {datalist.map((text) => (
                <option value={text} key={text} />
              ))}
            </datalist>
          )}
        </InputGroup>
      </FormControl>
    </Flex>
  )
}
