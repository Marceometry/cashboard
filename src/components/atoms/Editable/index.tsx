import {
  Editable as ChakraEditable,
  EditableInput,
  EditablePreview,
  Input,
} from '@chakra-ui/react'
import { EditableControls } from './EditableControls'

type Props = {
  defaultValue: string
  onSubmit: (value: string) => void
}

export const Editable = ({ onSubmit, defaultValue }: Props) => {
  return (
    <ChakraEditable
      onSubmit={(value) => onSubmit(value.trim())}
      defaultValue={defaultValue}
      isPreviewFocusable={false}
      selectAllOnFocus={false}
      submitOnBlur={false}
      display='flex'
      alignItems='flex-end'
      flexDir={{ base: 'column-reverse', sm: 'row' }}
      gap={{ base: '0', sm: '2' }}
    >
      <Input
        as={EditablePreview}
        variant='flushed'
        fontWeight='bold'
        fontSize='2xl'
      />
      <Input
        as={EditableInput}
        variant='flushed'
        fontWeight='bold'
        fontSize='2xl'
      />
      <EditableControls />
    </ChakraEditable>
  )
}
