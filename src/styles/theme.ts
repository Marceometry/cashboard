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
      width: '8px',
      height: '8px',
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '2px',
      backgroundColor: 'whiteAlpha.50',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    html: {
      height: '100vh',
      colorScheme: mode('light', 'dark')(props),
    },
    body: {
      fontFamily: 'sans-serif',
      color: mode('gray.800', 'gray.200')(props),
      bg: mode('gray.200', 'gray.900')(props),
      overflow: 'hidden',
      height: '100vh',
    },
    '[list]::-webkit-calendar-picker-indicator, *::-webkit-list-button': {
      display: 'none !important',
    },
  }),
}

export const theme = extendTheme({
  config,
  colors,
  styles,
})
