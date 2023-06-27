import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
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
      backgroundColor: mode('gray.200', 'whiteAlpha.50')(props),
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
      bg: {
        base: mode('whitesmoke', 'gray.800')(props),
        sm: mode('white', 'gray.900')(props),
      },
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
  styles,
})
