import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
}

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: keyof typeof icons
}

export const IconButton = ({ onClick, icon, ...rest }: Props) => {
  const Icon = icons[icon]

  return (
    <ChakraIconButton
      icon={<Icon />}
      onClick={onClick}
      aria-label='Adicionar transação'
      {...rest}
    />
  )
}
