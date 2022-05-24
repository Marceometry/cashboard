import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { Header } from './components'

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const styles = {
  global: (props: any) => ({
    body: {
      fontFamily: 'sans-serif',
      color: mode('gray.800', 'gray.200')(props),
      bg: mode('gray.200', 'gray.800')(props),
    },
  }),
}

const components = {
  Header,
}

export const theme = extendTheme({
  config,
  colors,
  styles,
  components,
})
