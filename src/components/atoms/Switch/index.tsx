import {
  Switch as ChakraSwitch,
  SwitchProps,
  useColorModeValue,
} from '@chakra-ui/react'

type Props = SwitchProps & {
  green?: boolean
}

export const Switch = ({ green, ...props }: Props) => {
  const color = useColorModeValue('green.400', 'green.500')

  return (
    <ChakraSwitch
      size={{ base: 'sm', sm: 'md' }}
      sx={{
        'span.chakra-switch__track[data-checked]': {
          backgroundColor: green ? color : undefined,
        },
      }}
      {...props}
    />
  )
}
