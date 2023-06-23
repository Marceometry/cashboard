import {
  Drawer as ChakraDrawer,
  Divider,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
} from '@chakra-ui/react'

export type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  header: React.ReactNode
  footer?: React.ReactNode
  placement?: 'left' | 'right'
}

export const Drawer = ({
  isOpen,
  onClose,
  placement,
  children,
  header,
  footer,
}: DrawerProps) => {
  const bg = useColorModeValue('gray.300', 'gray.800')

  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
      size='full'
    >
      <DrawerOverlay />
      <DrawerContent bg={bg} h='100%'>
        <DrawerCloseButton top={4} />
        <DrawerHeader>{header}</DrawerHeader>
        <Divider />

        <DrawerBody px={0}>{children}</DrawerBody>

        {footer ? (
          <>
            <Divider />
            <DrawerFooter>{footer}</DrawerFooter>
          </>
        ) : (
          ''
        )}
      </DrawerContent>
    </ChakraDrawer>
  )
}
