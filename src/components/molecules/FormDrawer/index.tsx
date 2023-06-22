import { UseFormReturn } from 'react-hook-form'
import { Divider, Flex } from '@chakra-ui/react'
import { Drawer, DrawerProps, Form, FormFooter } from '@/components'

type ButtonProps = {
  children: string
  onClick: () => void
  isLoading?: boolean
}

export type FormDrawerProps = DrawerProps & {
  formMethods: UseFormReturn<any, object>
  onConfirm: (data?: any) => void
  extraButton?: ButtonProps
}

export const FormDrawer = ({
  children,
  onClose,
  onConfirm,
  extraButton,
  formMethods,
  ...props
}: FormDrawerProps) => {
  return (
    <Drawer onClose={onClose} {...props}>
      <Form
        formMethods={formMethods}
        onSubmit={onConfirm}
        onShiftSubmit={extraButton?.onClick}
      >
        <Flex h='full' flexDir='column' justifyContent='space-between'>
          {children}

          <Divider />
          <FormFooter p='4' onClose={onClose} extraButton={extraButton} />
        </Flex>
      </Form>
    </Drawer>
  )
}
