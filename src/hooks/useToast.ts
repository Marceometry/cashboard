import { useToast as useChakraToast } from '@chakra-ui/react'

type ToastVariant = 'success' | 'error' | 'info'

export const useToast = () => {
  const toast = useChakraToast()

  const addToast = (title = 'Sucesso!', status: ToastVariant = 'success') => {
    const toastId = toast({
      title,
      status,
      position: 'top',
      isClosable: true,
      duration: status === 'info' ? null : status === 'success' ? 2000 : 4000,
    })
    return () => toast.close(toastId)
  }

  return addToast
}
