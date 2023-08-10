import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react'
import { Button } from '@/components'

type CheckboxProps = {
  id: string
  label: string
}

export type DialogProps = Omit<
  AlertDialogProps,
  'children' | 'leastDestructiveRef'
> & {
  title: string
  body: string
  onConfirm?: (data?: any) => void
  checkbox?: CheckboxProps
}

export const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  checkbox,
}: DialogProps) => {
  const { handleSubmit, register, reset } = useForm()
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const bg = useColorModeValue('whitesmoke', 'gray.800')

  const onSubmit = (data: any) => {
    onConfirm?.(data)
    onClose()
    reset()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxW='95vw' bg={bg} w={448}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {body}

              {checkbox && (
                <Checkbox size='sm' mt='4' {...register(checkbox.id)}>
                  {checkbox.label}
                </Checkbox>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              {onConfirm && (
                <Button colorScheme='orange' type='submit' ml={3}>
                  Confirmar
                </Button>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
