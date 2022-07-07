import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Funnel } from 'phosphor-react'

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
  list: HamburgerIcon,
  filter: Funnel,
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
