import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  ResponsiveValue,
} from '@chakra-ui/react'

export type InputNumberProps = {
  value: number
  onChange: (value: string) => void
  size?: ResponsiveValue<string>
}

export const InputNumber = ({ value, onChange, size }: InputNumberProps) => {
  return (
    <NumberInput
      min={1}
      max={999}
      value={value}
      onChange={onChange}
      size={size}
      display='inline-block'
      w='20'
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
