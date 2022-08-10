import {
  Button as ChakraButton,
  ButtonProps,
  ComponentWithAs,
} from '@chakra-ui/react'

export const Button: ComponentWithAs<'button', ButtonProps> = (props) => {
  return <ChakraButton whiteSpace='break-spaces' {...props} />
}
