import { AddIcon, DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip,
} from '@chakra-ui/react'
import {
  ChartBar,
  ChartLine,
  ChartPie,
  Copy,
  Download,
  Funnel,
  Table,
  X,
} from 'phosphor-react'

const icons = {
  add: AddIcon,
  close: X,
  copy: Copy,
  delete: DeleteIcon,
  download: Download,
  edit: EditIcon,
  filter: Funnel,
  list: HamburgerIcon,
  table: Table,
  areaChart: ChartLine,
  barChart: ChartBar,
  pieChart: ChartPie,
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
      isDisabled={!hasTooltip}
      label={props['aria-label']}
      placement='top'
      openDelay={1000}
      gutter={14}
      hasArrow
    >
      <ChakraIconButton icon={<Icon />} onClick={onClick} {...rest} />
    </Tooltip>
  )
}
