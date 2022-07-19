import { ChakraProvider } from '@chakra-ui/react'
import {
  AuthContextProvider,
  CategoriesContextProvider,
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
          <CategoriesContextProvider>
            <DialogContextProvider>
              <Router />
            </DialogContextProvider>
          </CategoriesContextProvider>
        </TransactionsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
