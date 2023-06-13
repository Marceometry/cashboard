import { useToast } from '@/hooks'

export const useFileDownload = () => {
  const toast = useToast()

  const downloadFile = (name: string, content: any, extension = 'txt') => {
    const element = document.createElement('a')
    const textFile = new Blob([JSON.stringify(content)])
    element.href = URL.createObjectURL(textFile)
    element.download = `${name}.${extension}`
    document.body.appendChild(element)
    element.click()
    toast('Download realizado com sucesso!')
  }

  return downloadFile
}
