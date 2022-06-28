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
  customButton?: React.ReactNode
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  onConfirm,
  customButton,
}: Props) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={600}>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Flex w='full' justify='space-around' gap='6'>
            <Button onClick={onConfirm} size='lg'>
              Confirmar
            </Button>
            {customButton}
            <Button onClick={onClose} variant='outline' size='lg'>
              Cancelar
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
