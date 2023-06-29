import {
  Menu as ChakraMenu,
  MenuList,
  MenuProps,
  useColorModeValue,
} from '@chakra-ui/react'

type JSXFunction = ({ isOpen }: { isOpen?: boolean }) => JSX.Element

type Props = MenuProps & {
  children: React.ReactNode
  trigger: React.ReactNode | JSXFunction
}

export const Menu = ({ children, trigger, ...props }: Props) => {
  const bg = useColorModeValue('whitesmoke', 'gray.800')

  return (
    <ChakraMenu {...props}>
      {({ isOpen }) => (
        <>
          {typeof trigger === 'function' ? trigger({ isOpen }) : trigger}

          <MenuList minWidth='200px' bg={bg}>
            {children}
          </MenuList>
        </>
      )}
    </ChakraMenu>
  )
}
