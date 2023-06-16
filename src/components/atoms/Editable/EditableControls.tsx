import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react'

export const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return (
    <Center>
      {isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton
            aria-label=''
            icon={<CheckIcon />}
            {...getSubmitButtonProps()}
          />
          <IconButton
            aria-label=''
            icon={<CloseIcon />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='center'>
          <IconButton
            aria-label=''
            size='sm'
            icon={<EditIcon />}
            {...getEditButtonProps()}
          />
        </Flex>
      )}
    </Center>
  )
}
