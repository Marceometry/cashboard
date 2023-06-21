import { UseFormReturn } from 'react-hook-form'
import { Divider, Flex, useBreakpointValue } from '@chakra-ui/react'
import { Button, Drawer, DrawerProps, Form } from '@/components'

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
  const isSmallScreen = useBreakpointValue({ base: true, sm: false })

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
          <Flex
            p='4'
            w='full'
            justify='center'
            gap={isSmallScreen ? '3' : '6'}
            direction={isSmallScreen ? 'column' : 'row'}
          >
            <Button type='submit' w='100%'>
              Confirmar
            </Button>
            {extraButton && (
              <Button onClick={extraButton.onClick} type='submit' w='100%'>
                {extraButton.children}
              </Button>
            )}
            <Button onClick={onClose} variant='outline' w='100%'>
              Cancelar
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Drawer>
  )
}
