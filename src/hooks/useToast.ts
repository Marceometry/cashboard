import { useToast as useChakraToast } from '@chakra-ui/react'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export const useToast = () => {
  const toast = useChakraToast()

  const addToast = (
    title = 'Sucesso!',
    status: ToastVariant = 'success',
    duration?: number | null
  ) => {
    const toastId = toast({
      title,
      status,
      position: 'top',
      isClosable: true,
      duration:
        duration !== undefined
          ? duration
          : status === 'info'
          ? null
          : status === 'success'
          ? 2000
          : 4000,
    })
    return () => toast.close(toastId)
  }

  return addToast
}
