import { useEffect, useState } from 'react'

export const useFileHandle = () => {
  const [input, setInput] = useState<HTMLInputElement | null>(null)
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    const element = document.createElement("input")
    element.type = "file"
    element.onchange = (e: any) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = (e.target?.result)
        setFileContent(text as string)
      }
      reader.readAsText(e.target.files[0])
      element.value = ''
    }
    document.body.appendChild(element)
    setInput(element)
  }, [])

  const downloadFile = (name: string, content: any, extension: string = 'txt') => {
    const element = document.createElement("a")
    const textFile = new Blob([JSON.stringify(content)])
    element.href = URL.createObjectURL(textFile)
    element.download = `${name}.${extension}`
    document.body.appendChild(element)
    element.click()
  }

  const importFile = () => input?.click()

  return { importFile, fileContent, downloadFile }
}
