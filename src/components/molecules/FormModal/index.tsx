import { UseFormReturn } from 'react-hook-form'
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
import { Form, FormFooter } from '@/components'

type ButtonProps = {
  children: string
  onClick: () => void
  isLoading?: boolean
}

export type FormModalProps = ChakraModalProps & {
  title: string
  formMethods: UseFormReturn<any, object>
  onConfirm: (data?: any) => void
  extraButton?: ButtonProps
  maxWidth?: number
}

export const FormModal = ({
  children,
  title,
  isOpen,
  onClose,
  onConfirm,
  extraButton,
  formMethods,
  maxWidth = 660,
}: FormModalProps) => {
  const bg = useColorModeValue('whitesmoke', 'gray.800')

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={maxWidth} bg={bg} maxH='95vh' my={0} mx={4}>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton top='5' />
        <Form
          formMethods={formMethods}
          onSubmit={onConfirm}
          onShiftSubmit={extraButton?.onClick}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <ModalBody maxH='65vh'>{children}</ModalBody>

          <ModalFooter>
            <FormFooter onClose={onClose} extraButton={extraButton} />
          </ModalFooter>
        </Form>
      </ModalContent>
    </ChakraModal>
  )
}
