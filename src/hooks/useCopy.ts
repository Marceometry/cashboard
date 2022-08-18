import { useToast } from '@/hooks'

export const useCopy = () => {
  const toast = useToast()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast('Copiado com sucesso!')
  }

  return handleCopy
}
