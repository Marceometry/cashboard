import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

type ModalProps = ChakraModalProps & {
  title: string
  maxWidth?: number
  modalFooter?: React.ReactNode
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  modalFooter,
  maxWidth = 660,
}: ModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={maxWidth} mx={8} overflow='auto'>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxH='50vh'>{children}</ModalBody>

        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}
