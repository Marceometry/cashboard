import { Switch as ChakraSwitch, SwitchProps } from '@chakra-ui/react'

type Props = SwitchProps & {
  green?: boolean
}

export const Switch = ({ green, ...props }: Props) => {
  return (
    <ChakraSwitch
      size={{ base: 'sm', sm: 'md' }}
      sx={{
        'span.chakra-switch__track[data-checked]': {
          backgroundColor: green ? 'green.500' : undefined,
        },
      }}
      {...props}
    />
  )
}
