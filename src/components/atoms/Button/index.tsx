import {
  ButtonProps,
  Button as ChakraButton,
  ComponentWithAs,
} from '@chakra-ui/react'

export const Button: ComponentWithAs<'button', ButtonProps> = (props) => {
  return <ChakraButton whiteSpace='break-spaces' lineHeight='100%' {...props} />
}
