import { Flex } from '@chakra-ui/react'
import { Button, ButtonProps } from '@/components'

type FormFooterProps = {
  onClose: () => void
  extraButton?: ButtonProps
  p?: string | number
}

export const FormFooter = ({ onClose, extraButton, p }: FormFooterProps) => {
  return (
    <Flex
      p={p}
      w='full'
      justify='center'
      gap={{ base: '3', sm: '6' }}
      direction={{ base: 'column', sm: 'row' }}
    >
      <Button type='submit' w='100%' size={{ base: 'md', sm: 'lg' }}>
        Confirmar
      </Button>
      {extraButton && (
        <Button
          onClick={extraButton.onClick}
          type='submit'
          w='100%'
          size={{ base: 'md', sm: 'lg' }}
        >
          {extraButton.children}
        </Button>
      )}
      <Button
        onClick={onClose}
        variant='outline'
        w='100%'
        size={{ base: 'md', sm: 'lg' }}
      >
        Cancelar
      </Button>
    </Flex>
  )
}
