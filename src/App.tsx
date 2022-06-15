import { ChakraProvider } from '@chakra-ui/react'
import { TransactionsContextProvider } from './contexts'
import { Home } from './pages'
import { theme } from './styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TransactionsContextProvider>
        <Home />
      </TransactionsContextProvider>
    </ChakraProvider>
  )
}
