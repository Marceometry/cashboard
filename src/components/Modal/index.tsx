import {
  Button,
  Flex,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'

type Props = ModalProps & {
  title: string
  onConfirm?: () => void
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Flex w='full' justify='space-around'>
            <Button onClick={onClose} variant='outline' size='lg'>
              Cancelar
            </Button>
            <Button onClick={onConfirm} size='lg'>
              Confirmar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
