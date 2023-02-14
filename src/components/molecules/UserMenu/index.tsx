import { useEffect, useState } from 'react'
import {
  Button as ChakraButton,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  useBreakpointValue,
  Text,
  Code,
  Flex,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Download, FileArrowDown, SignOut } from 'phosphor-react'
import { Button, CodeBlock, Modal, ThemeIcon } from '@/components'
import { useAuth, useTransactions } from '@/contexts'
import { useFileHandle } from '@/hooks'
import { sortByDate } from '@/utils'
import { CODE_EXAMPLE, FORMATTED_CODE_EXAMPLE } from './constants'

export const UserMenu = () => {
  const showName = useBreakpointValue({ base: false, sm: true })
  const { toggleColorMode } = useColorMode()
  const [isImportFileModalOpen, setIsImportFileModalOpen] = useState(false)
  const { importFile, fileContent, downloadFile } = useFileHandle()
  const { transactionList, uploadTransactionList } = useTransactions()
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!fileContent) return
    closeImportFileModal()
    uploadTransactionList(fileContent)
  }, [fileContent])

  if (!user) return null

  const localBackup = () => {
    const username = user.name.toUpperCase().replaceAll(' ', '-')
    const date = new Date().toISOString().split('T')[0]
    const fileName = `cashboard-backup-${username}-${date}`
    downloadFile(fileName, sortByDate(transactionList, true), 'json')
  }

  const openImportFileModal = () => setIsImportFileModalOpen(true)
  const closeImportFileModal = () => setIsImportFileModalOpen(false)

  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={ChakraButton}
              px='2'
              borderRadius='999'
              leftIcon={
                <Avatar size='sm' name={user.name} src={user.photoUrl} />
              }
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            >
              {showName && user.name}
            </MenuButton>

            <MenuList minWidth='200px'>
              <MenuItem icon={<ThemeIcon />} onClick={toggleColorMode}>
                Alterar Tema
              </MenuItem>
              <MenuItem icon={<Download />} onClick={localBackup}>
                Backup Local
              </MenuItem>
              <MenuItem icon={<FileArrowDown />} onClick={openImportFileModal}>
                Importar arquivo
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<SignOut />} onClick={signOut}>
                Sair
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Modal
        title='Importar Arquivo'
        isOpen={isImportFileModalOpen}
        onClose={closeImportFileModal}
        modalFooter={
          <Flex gap='4' w='full'>
            <Button w='full' onClick={importFile}>
              Importar
            </Button>
            <Button w='full' onClick={closeImportFileModal} variant='outline'>
              Cancelar
            </Button>
          </Flex>
        }
      >
        <Text mb='6'>
          Para adicionar várias transações a partir de um arquivo local, você
          deve importar um arquivo <Code>.json</Code> com o seguinte formato:
        </Text>
        <CodeBlock
          codeString={CODE_EXAMPLE}
          formattedCodeString={FORMATTED_CODE_EXAMPLE}
        />
      </Modal>
    </>
  )
}
