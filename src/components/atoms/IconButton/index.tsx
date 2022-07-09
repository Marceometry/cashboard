import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Funnel } from 'phosphor-react'

const icons = {
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  list: HamburgerIcon,
  filter: Funnel,
}

export type IconOption = keyof typeof icons

export type IconButtonProps = Omit<ChakraIconButtonProps, 'icon'> & {
  icon: IconOption
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
      gutter={14}
      hasArrow
    >
      <ChakraIconButton icon={<Icon />} onClick={onClick} {...rest} />
    </Tooltip>
  )
}
