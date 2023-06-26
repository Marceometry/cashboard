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
          <RecurrencesContextProvider>
            <TransactionsContextProvider>
              <DialogContextProvider>
                <Router />
              </DialogContextProvider>
            </TransactionsContextProvider>
          </RecurrencesContextProvider>
        </AuthContextProvider>
      </FirebaseContextProvider>
    </ChakraProvider>
  )
}
