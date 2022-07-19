import { useColorMode } from '@chakra-ui/react'
import { Moon, Sun } from 'phosphor-react'

export const ThemeIcon = () => {
  const { colorMode } = useColorMode()

  return colorMode === 'dark' ? <Moon /> : <Sun />
}
