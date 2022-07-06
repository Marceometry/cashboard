import { UseFormReturn } from 'react-hook-form'
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Form } from '@/components'

type ButtonProps = {
  children: string
  onClick: () => void
}

export type ModalProps = ChakraModalProps & {
  title: string
  formMethods: UseFormReturn<any, object>
  onConfirm?: (data?: any) => void
  extraButton?: ButtonProps
  maxWidth?: number
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  onConfirm,
  extraButton,
  formMethods,
  maxWidth = 600,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={maxWidth}>
        <Form formMethods={formMethods} onSubmit={onConfirm}>
          <ModalHeader fontSize='2xl'>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Flex w='full' justify='space-around' gap='6'>
              <Button type='submit' size='lg'>
                Confirmar
              </Button>
              {extraButton && (
                <Button onClick={extraButton.onClick} type='submit' size='lg'>
                  {extraButton.children}
                </Button>
              )}
              <Button onClick={onClose} variant='outline' size='lg'>
                Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ChakraModal>
  )
}
