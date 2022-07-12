import { Center } from '@chakra-ui/react'
import { Archive } from 'phosphor-react'

export const EmptyData = () => {
  return (
    <Center w='100%' h='100%' flexDirection='column'>
      <Archive size={64} />
      Não há dados para exibir.
    </Center>
  )
}
