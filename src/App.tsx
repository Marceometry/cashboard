import { ChakraProvider } from '@chakra-ui/react'
import {
  AuthContextProvider,
  DialogContextProvider,
  TransactionsContextProvider,
} from '@/contexts'
import { Router } from '@/router'
import { theme } from '@/styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <TransactionsContextProvider>
          <DialogContextProvider>
            <Router />
          </DialogContextProvider>
        </TransactionsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
