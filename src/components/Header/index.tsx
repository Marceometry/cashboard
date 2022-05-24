import { Flex } from '@chakra-ui/react'
import { ToggleColorMode } from '..'

export const Header = () => {
  return (
    <Flex as='header' align='center' justify='flex-end' gap='8'>
      <ToggleColorMode />
    </Flex>
  )
}
