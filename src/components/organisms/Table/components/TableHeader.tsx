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
import { TableButtons } from '../types'

type HeaderProps = {
  caption?: React.ReactNode
  noSearch?: boolean
  buttons?: TableButtons
  searchText: string
  setSearchText: (value: string) => void
  toggleChart: () => void
  isChartView: boolean
  showToggleChartButton: boolean
}

export const TableHeader = ({
  caption,
  noSearch,
  buttons,
  searchText,
  setSearchText,
  toggleChart,
  isChartView,
  showToggleChartButton,
}: HeaderProps) => {
  return (
    <Flex
      justifyContent={caption ? 'space-between' : 'flex-end'}
      gap='8'
      mb='4'
    >
      {caption && <Heading fontSize='3xl'>{caption}</Heading>}

      <Flex gap='4'>
        {!noSearch && (
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
        )}

        {showToggleChartButton && (
          <IconButton
            icon={isChartView ? 'table' : 'chartBar'}
            aria-label={isChartView ? 'Mostrar tabela' : 'Mostrar gráfico'}
            onClick={toggleChart}
          />
        )}

        {buttons?.iconButtons?.map((button) => (
          <IconButton key={button.icon} {...button} />
        ))}

        {buttons?.textButtons?.map((button) => (
          <Button key={button.children} {...button} />
        ))}
      </Flex>
    </Flex>
  )
}
