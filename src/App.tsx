import { ChakraProvider } from '@chakra-ui/react'
import {
  AuthContextProvider,
  DialogContextProvider,
  FirebaseContextProvider,
  RecurrencesContextProvider,
  TransactionsContextProvider,
} from '@/contexts'
import { Router } from '@/router'
import { theme } from '@/styles'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <FirebaseContextProvider>
        <AuthContextProvider>
          <TransactionsContextProvider>
            <RecurrencesContextProvider>
              <DialogContextProvider>
                <Router />
              </DialogContextProvider>
            </RecurrencesContextProvider>
          </TransactionsContextProvider>
        </AuthContextProvider>
      </FirebaseContextProvider>
    </ChakraProvider>
  )
}
