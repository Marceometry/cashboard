import { ChakraProvider } from '@chakra-ui/react'
import {
  AuthContextProvider,
  CategoriesContextProvider,
  DialogContextProvider,
  TagsContextProvider,
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
            <TagsContextProvider>
              <DialogContextProvider>
                <Router />
              </DialogContextProvider>
            </TagsContextProvider>
          </CategoriesContextProvider>
        </TransactionsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}
