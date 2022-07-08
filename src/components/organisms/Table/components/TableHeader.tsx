import {
  Heading,
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@/components'
import { ButtonProps } from '../types'

type HeaderProps = {
  caption?: string
  noFilters?: boolean
  buttons?: ButtonProps[]
  searchText: string
  setSearchText: (value: string) => void
  handleOpenModalFilters: () => void
}

export const TableHeader = ({
  caption,
  noFilters,
  buttons,
  searchText,
  setSearchText,
  handleOpenModalFilters,
}: HeaderProps) => {
  return (
    <Flex justifyContent='space-between' gap='8' mb='4'>
      {caption && <Heading fontSize='3xl'>{caption}</Heading>}

      {!noFilters && (
        <Flex gap='4'>
          <InputGroup w='auto'>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input
              placeholder='Pesquisar...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>

          <IconButton
            icon='filter'
            aria-label='Selecionar Filtros'
            onClick={handleOpenModalFilters}
          />

          {buttons?.map((button) => (
            <Button key={button.children} {...button} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
