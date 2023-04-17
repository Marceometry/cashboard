import { Center } from '@chakra-ui/react'
import { Archive } from 'phosphor-react'

const defaultMessage = 'Não há dados para exibir.'

type Props = {
  message?: string
}

export const EmptyData = ({ message = defaultMessage }: Props) => {
  return (
    <Center w='100%' h='100%' flexDirection='column'>
      <Archive size={64} />
      {message}
    </Center>
  )
}
