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
import { useKeyboardListener } from '@/hooks'

type ButtonProps = {
  children: string
  onClick: () => void
  isLoading?: boolean
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
  const { useShiftShortcut } = useKeyboardListener()

  useShiftShortcut(() => extraButton?.onClick(), 'Enter')

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={maxWidth} overflow='auto'>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton />
        <Form formMethods={formMethods} onSubmit={onConfirm}>
          <ModalBody maxH='50vh'>{children}</ModalBody>

          <ModalFooter>
            <Flex w='full' justify='center' gap='6'>
              <Button type='submit' size='lg' w='100%'>
                Confirmar
              </Button>
              {extraButton && (
                <Button
                  onClick={extraButton.onClick}
                  type='submit'
                  size='lg'
                  w='100%'
                >
                  {extraButton.children}
                </Button>
              )}
              <Button onClick={onClose} variant='outline' size='lg' w='100%'>
                Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ChakraModal>
  )
}
