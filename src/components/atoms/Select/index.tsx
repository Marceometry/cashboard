import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'

type Option = {
  label: string
  value: string
}

type Props = SelectProps & {
  options: Option[] | string[]
}

export const Select = ({ options, ...props }: Props) => {
  const formattedOptions = options.map((item, index) => {
    if (typeof item === 'object') return item
    return {
      label: item,
      value: String(index + 1),
    }
  })

  return (
    <ChakraSelect {...props}>
      {formattedOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  )
}
