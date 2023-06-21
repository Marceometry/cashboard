import { UseFormReturn } from 'react-hook-form'
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Button, Form } from '@/components'

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
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={maxWidth} maxH='95vh' my={0} mx={4} overflow='auto'>
        <ModalHeader fontSize='2xl'>{title}</ModalHeader>
        <ModalCloseButton top='5' />
        <Form
          formMethods={formMethods}
          onSubmit={onConfirm}
          onShiftSubmit={extraButton?.onClick}
        >
          <ModalBody maxH='65vh'>{children}</ModalBody>

          <ModalFooter>
            <Flex
              w='full'
              justify='center'
              gap={isSmallScreen ? '3' : '6'}
              direction={isSmallScreen ? 'column' : 'row'}
            >
              <Button type='submit' w='100%'>
                Confirmar
              </Button>
              {extraButton && (
                <Button onClick={extraButton.onClick} type='submit' w='100%'>
                  {extraButton.children}
                </Button>
              )}
              <Button onClick={onClose} variant='outline' w='100%'>
                Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </ChakraModal>
  )
}
