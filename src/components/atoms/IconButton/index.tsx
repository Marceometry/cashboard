import React from 'react'
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

export const IconButton = React.forwardRef(
  (props: IconButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    const { onClick, icon, ...rest } = props
    const Icon = icons[icon]

    return (
      <ChakraIconButton icon={<Icon />} ref={ref} onClick={onClick} {...rest} />
    )
  }
)
