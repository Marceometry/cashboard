import { useEffect, useState } from 'react'

export const useFileImport = () => {
  const [input, setInput] = useState<HTMLInputElement | null>(null)
  const [fileContent, setFileContent] = useState('')

  useEffect(() => {
    const id = 'cashboard-import-file-input'
    if (input && document.getElementById(id)) return

    const element = document.createElement('input')
    element.id = id
    element.type = 'file'
    element.style.display = 'none'
    element.onchange = (e: any) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result
        setFileContent(text as string)
      }
      reader.readAsText(e.target.files[0])
      element.value = ''
    }

    document.body.appendChild(element)
    setInput(element)
  }, [input])

  const importFile = () => input?.click()

  return { importFile, fileContent }
}
