import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
  list: HamburgerIcon,
}

export type IconButtonProps = Omit<ChakraIconButtonProps, 'icon'> & {
  icon: keyof typeof icons
}

export const IconButton = ({ onClick, icon, ...rest }: IconButtonProps) => {
  const Icon = icons[icon]

  return <ChakraIconButton icon={<Icon />} onClick={onClick} {...rest} />
}
