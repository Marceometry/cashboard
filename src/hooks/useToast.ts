import { useToast as useChakraToast } from '@chakra-ui/react'

type ToastVariant = 'success' | 'error'

export const useToast = () => {
  const toast = useChakraToast()

  const addToast = (title: string, status: ToastVariant = 'success') => {
    if (!title) return
    return toast({
      title,
      status,
      position: 'top',
      isClosable: true,
      duration: status === 'success' ? 2000 : 4000,
    })
  }

  return addToast
}
