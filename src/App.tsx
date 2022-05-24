import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './pages'
import { theme } from './styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  )
}
