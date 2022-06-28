import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

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
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: `rgb(64, 75, 94)`,
    },
    body: {
      fontFamily: 'sans-serif',
      color: mode('gray.800', 'gray.200')(props),
      bg: mode('gray.200', 'gray.800')(props),
      overflow: 'hidden',
      height: '100vh',
    },
  }),
}

export const theme = extendTheme({
  config,
  colors,
  styles,
})
