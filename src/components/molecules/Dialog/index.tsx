import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
} from '@chakra-ui/react'
import { Button } from '@/components'

export type DialogProps = Omit<
  AlertDialogProps,
  'children' | 'leastDestructiveRef'
> & {
  title: string
  body: string
  onConfirm?: () => void
}

export const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
}: DialogProps) => {
  const cancelRef = useRef(null)

  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='orange' onClick={handleConfirm} ml={3}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
