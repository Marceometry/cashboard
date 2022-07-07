import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type Props = SelectProps & {
  options: Option[] | string[]
  name: string
}

export const Select = ({ options, name, ...props }: Props) => {
  const { register } = useFormContext()

  const formattedOptions = options.map((item, index) => {
    if (typeof item === 'object') return item
    return {
      label: item,
      value: String(index + 1),
    }
  })

  return (
    <ChakraSelect {...register(name)} {...props}>
      {formattedOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  )
}
