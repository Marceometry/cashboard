import { IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const FloatButton = ({ onClick, ...rest }: Props) => {
  return (
    <IconButton
      icon={<AddIcon />}
      onClick={onClick}
      isRound
      size='lg'
      aria-label='Adicionar transação'
      position='fixed'
      bottom='10'
      right='10'
      {...rest}
    />
  )
}
