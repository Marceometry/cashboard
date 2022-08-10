import { Heading, Flex } from '@chakra-ui/react'
import { Button, IconButton, SearchInput } from '@/components'
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
      align='center'
      justify={caption ? 'space-between' : 'flex-end'}
      direction={{ base: 'column', lg: 'row' }}
      gap={{ base: '4', lg: '8' }}
      w='full'
      mb='4'
    >
      {caption && <Heading fontSize='3xl'>{caption}</Heading>}

      <Flex gap='4' flexDirection={{ base: 'column', sm: 'row' }}>
        {(!noSearch || currentView === 'table') && (
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        )}

        <Flex gap='4' justify='center'>
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
    </Flex>
  )
}
