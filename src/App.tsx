import { ChakraProvider } from '@chakra-ui/react'
import { TransactionsContextProvider } from './contexts'
import { Router } from './router'
import { theme } from './styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TransactionsContextProvider>
        <Router />
      </TransactionsContextProvider>
    </ChakraProvider>
  )
}
