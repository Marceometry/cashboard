import { useEffect } from 'react'
import { Code, Flex, Text } from '@chakra-ui/react'
import { Button, CodeBlock, Modal } from '@/components'
import { useTransactions } from '@/contexts'
import { useFileImport } from '@/hooks'
import { CODE_EXAMPLE, FORMATTED_CODE_EXAMPLE } from '../UserMenu/constants'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const FileImportModal = ({ isOpen, onClose }: Props) => {
  const { importFile, fileContent } = useFileImport()
  const { uploadTransactionList } = useTransactions()

  useEffect(() => {
    if (!fileContent) return
    onClose()
    uploadTransactionList(fileContent)
  }, [fileContent])

  return (
    <Modal
      title='Importar Arquivo'
      isOpen={isOpen}
      onClose={onClose}
      modalFooter={
        <Flex gap='4' w='full'>
          <Button w='full' onClick={importFile}>
            Importar
          </Button>
          <Button w='full' onClick={onClose} variant='outline'>
            Cancelar
          </Button>
        </Flex>
      }
    >
      <Text mb='6'>
        Para adicionar várias transações a partir de um arquivo local, você deve
        importar um arquivo <Code>.json</Code> com o seguinte formato:
      </Text>
      <CodeBlock
        codeString={CODE_EXAMPLE}
        formattedCodeString={FORMATTED_CODE_EXAMPLE}
      />
    </Modal>
  )
}
