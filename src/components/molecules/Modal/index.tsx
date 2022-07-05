import { UseFormReturn } from 'react-hook-form'
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
import { Form } from '@/components'

type ButtonProps = {
  children: string
  onClick: () => void
}

type Props = ModalProps & {
  title: string
  formMethods: UseFormReturn<any, object>
  onConfirm?: (data?: any) => void
  extraButton?: ButtonProps
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  onConfirm,
  extraButton,
  formMethods,
}: Props) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={600}>
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
