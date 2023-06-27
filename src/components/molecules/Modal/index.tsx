import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
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
  const bg = useColorModeValue('whitesmoke', 'gray.800')

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      isCentered
    >
      <ModalOverlay />
      <ModalContent w='95vw' bg={bg} maxW={maxWidth} mx={8} overflow='auto'>
        <ModalHeader pr='16' fontSize='2xl'>
          {title}
        </ModalHeader>
        <ModalCloseButton top={4} right={6} />
        <ModalBody px={{ base: '4', sm: '6' }}>{children}</ModalBody>

        {modalFooter ? <ModalFooter>{modalFooter}</ModalFooter> : ''}
      </ModalContent>
    </ChakraModal>
  )
}
