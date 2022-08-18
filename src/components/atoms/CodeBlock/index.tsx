import { Box, Flex } from '@chakra-ui/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useCopy, useFileHandle } from '@/hooks'
import { IconButton } from '@/components'

type Props = {
  codeString?: string
  formattedCodeString?: string
}

export const CodeBlock = ({
  codeString = '',
  formattedCodeString = '{}',
}: Props) => {
  const { downloadFile } = useFileHandle()
  const copy = useCopy()

  const handleCopy = () => copy(formattedCodeString)
  const handleDownload = () => {
    downloadFile('exemplo', JSON.parse(formattedCodeString), 'json')
  }

  return (
    <Box position='relative'>
      <SyntaxHighlighter
        language='json'
        customStyle={{ borderRadius: 6, fontSize: 15 }}
        style={dracula}
      >
        {codeString}
      </SyntaxHighlighter>

      <Flex position='absolute' right={0} top={0}>
        <IconButton
          icon='copy'
          variant='ghost'
          aria-label='Copiar exemplo'
          borderTopRightRadius={0}
          borderTopLeftRadius={0}
          onClick={handleCopy}
          hasTooltip
        />

        <IconButton
          icon='download'
          variant='ghost'
          aria-label='Baixar exemplo'
          borderBottomRightRadius={0}
          borderTopLeftRadius={0}
          onClick={handleDownload}
          hasTooltip
        />
      </Flex>
    </Box>
  )
}
