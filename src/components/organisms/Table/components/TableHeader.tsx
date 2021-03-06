import {
  Heading,
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { IconButton, SearchInput } from '@/components'
import { ChartProps, ChartType, TableButtons } from '../types'

type HeaderProps = {
  caption?: React.ReactNode
  noSearch?: boolean
  buttons?: TableButtons
  searchText: string
  setSearchText: (value: string) => void
  toggleChart: (chartType: ChartType) => void
  currentView: 'table' | ChartType
  charts?: ChartProps[]
}

export const TableHeader = ({
  caption,
  noSearch,
  buttons,
  searchText,
  setSearchText,
  toggleChart,
  currentView,
  charts,
}: HeaderProps) => {
  return (
    <Flex
      justifyContent={caption ? 'space-between' : 'flex-end'}
      gap='8'
      mb='4'
    >
      {caption && <Heading fontSize='3xl'>{caption}</Heading>}

      <Flex gap='4'>
        {(!noSearch || currentView === 'table') && (
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        )}

        {charts?.map((chart) => (
          <IconButton
            key={chart.type}
            onClick={() => toggleChart(chart.type)}
            icon={currentView === chart.type ? 'table' : `${chart.type}Chart`}
            aria-label={
              currentView === chart.type
                ? 'Mostrar tabela'
                : `Mostrar gráfico ${
                    chart.type === 'pie' ? 'Pizza' : 'de Barras'
                  }`
            }
          />
        ))}

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
