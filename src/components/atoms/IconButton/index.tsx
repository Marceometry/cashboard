import React from 'react'
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
  list: HamburgerIcon,
}

export type IconButtonProps = Omit<ChakraIconButtonProps, 'icon'> & {
  icon: keyof typeof icons
  hasTooltip?: boolean
}

export const IconButton = (props: IconButtonProps) => {
  const { onClick, icon, hasTooltip, ...rest } = props
  const Icon = icons[icon]

  return (
    <Tooltip
      label={props['aria-label']}
      isDisabled={!hasTooltip}
      placement='top'
      openDelay={500}
      gutter={14}
      hasArrow
    >
      <ChakraIconButton icon={<Icon />} onClick={onClick} {...rest} />
    </Tooltip>
  )
}
