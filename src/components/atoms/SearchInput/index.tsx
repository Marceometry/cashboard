import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  InputProps,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedValue } from '@/hooks'

type Props = InputProps & {
  debouncedOnChange: (value: string) => void
}

export const SearchInput = ({ debouncedOnChange, ...props }: Props) => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    debouncedOnChange(debouncedSearchText)
  }, [debouncedSearchText])

  return (
    <InputGroup w='auto'>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input
        placeholder='Pesquisar...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        ref={inputRef}
        {...props}
      />
      <InputRightElement>
        {searchText && (
          <IconButton
            icon='close'
            variant='ghost'
            aria-label='Limpar campo de pesquisa'
            onClick={() => {
              setSearchText('')
              inputRef.current?.focus()
            }}
            borderRadius={0}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}
