import { Flex, Radio, RadioGroup } from '@chakra-ui/react'
import { RadioOption } from '..'

type Props = {
  options: RadioOption[]
  value?: string
  onChange?: (nextValue: string) => void
}

export const ControlledRadioGroup = ({ value, onChange, options }: Props) => (
  <RadioGroup value={value} onChange={onChange}>
    <Flex flexWrap='wrap' gap={{ base: '2', sm: '4' }}>
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          size={{ base: 'sm', sm: 'md' }}
        >
          {option.label}
        </Radio>
      ))}
    </Flex>
  </RadioGroup>
)
