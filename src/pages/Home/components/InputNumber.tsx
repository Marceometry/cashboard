import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'

export type InputNumberProps = {
  value: number
  onChange: (value: string) => void
}

export const InputNumber = ({ value, onChange }: InputNumberProps) => {
  return (
    <NumberInput
      min={1}
      max={999}
      value={value}
      onChange={onChange}
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
