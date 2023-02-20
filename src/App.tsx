import { ChakraProvider } from '@chakra-ui/react'
import {
  AuthContextProvider,
  DialogContextProvider,
  RecurrencesContextProvider,
  TransactionsContextProvider,
} from '@/contexts'
import { Router } from '@/router'
import { theme } from '@/styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <RecurrencesContextProvider>
          <TransactionsContextProvider>
            <DialogContextProvider>
              <Router />
            </DialogContextProvider>
          </TransactionsContextProvider>
        </RecurrencesContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
