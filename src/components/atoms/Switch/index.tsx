import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'

export const Switch = (props: SwitchProps) => {
  return (
    <ChakraSwitch
      {...props}
      sx={{
        'span.chakra-switch__track[data-checked]': {
          backgroundColor: 'green.500',
        },
      }}
    />
  )
}
