import { Center, Heading } from '@chakra-ui/react'
import { LogoIcon } from '@/assets'

export const Logo = () => {
  return (
    <Center gap='2' pr='2'>
      <LogoIcon />
      <Heading>Cashboard</Heading>
    </Center>
  )
}
