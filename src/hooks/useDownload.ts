export const useDownload = () => {
  const download = (name: string, content: any, extension: string = 'txt') => {
    const element = document.createElement("a")
    const textFile = new Blob([JSON.stringify(content)])
    element.href = URL.createObjectURL(textFile)
    element.download = `${name}.${extension}`
    document.body.appendChild(element)
    element.click()
  }

  return download
}
