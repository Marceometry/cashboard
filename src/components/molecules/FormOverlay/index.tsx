import { Flex, useBreakpointValue } from '@chakra-ui/react'
import { FormDrawer, FormDrawerProps, FormModal } from '@/components'

type FormOverlayProps = Omit<FormDrawerProps, 'header'> & {
  title: string
  children: React.ReactNode
}

export const FormOverlay = ({
  children,
  isOpen,
  onClose,
  onConfirm,
  formMethods,
  title,
  extraButton,
}: FormOverlayProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

  const props = {
    isOpen,
    onClose,
    onConfirm,
    formMethods,
    extraButton,
  }

  return isSmallScreen ? (
    <FormDrawer header={title} {...props}>
      <Flex
        mt='2'
        mb='4'
        pt='2'
        px='4'
        h='100%'
        flexDir='column'
        justifyContent='space-between'
        overflow='auto'
      >
        {children}
      </Flex>
    </FormDrawer>
  ) : (
    <FormModal title={title} {...props}>
      {children}
    </FormModal>
  )
}
