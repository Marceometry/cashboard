import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTransactions } from '@/contexts'
import { DateParam } from '@/types'
import { ColumnProps } from '../types'

type Props = {
  selectedSortBy: any
  setSelectedSortBy: (value: any) => void
  reverseSort: boolean
  setReverseSort: (value: boolean) => void
  columns: ColumnProps<any>[]
  paginatedData: any[]
  lastElementRef: (node: any, index: number) => void | null
  mobileCard: (data: any, dateParam: DateParam) => React.ReactNode
}

export const MobileTableBody = ({
  selectedSortBy,
  setSelectedSortBy,
  reverseSort,
  setReverseSort,
  columns,
  paginatedData,
  lastElementRef,
  mobileCard: mobileCard,
}: Props) => {
  const { dateParam } = useTransactions()
  const headerBg = useColorModeValue('gray.100', 'whiteAlpha.200')

  return (
    <Box h='100%' overflowY='auto' overflowX='hidden'>
      <Flex justifyContent='flex-end' py='1' px='4' w='full' bg={headerBg}>
        <Box position='relative'>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              size='sm'
              variant='outline'
              aria-label='Ordenar por'
            >
              <HamburgerIcon />
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type='radio'
                defaultValue={selectedSortBy}
                onChange={setSelectedSortBy}
              >
                <Text fontWeight='bold' fontSize='sm' mx='4' mb='1'>
                  Ordenar por
                </Text>
                {columns
                  .filter((column) => !!column.field)
                  .map((column) => {
                    const value = column.field as string
                    return (
                      <MenuItemOption
                        key={value}
                        value={value}
                        fontSize='sm'
                        py='1'
                        px='4'
                      >
                        {column.label}
                      </MenuItemOption>
                    )
                  })}
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                type='radio'
                defaultValue={String(reverseSort)}
                onChange={(value) =>
                  setReverseSort(JSON.parse(value as string))
                }
              >
                <Text fontWeight='bold' fontSize='sm' mx='4' mb='1'>
                  Ordem
                </Text>
                <MenuItemOption value='true' fontSize='sm' py='1' px='4'>
                  Crescente
                </MenuItemOption>
                <MenuItemOption value='false' fontSize='sm' py='1' px='4'>
                  Decrescente
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      {paginatedData.map((item, index) => (
        <Box key={index} ref={(node) => lastElementRef(node, index)}>
          <Grid p='4' gap='1' templateColumns='3fr 2fr'>
            {mobileCard(item, dateParam)}
          </Grid>
          <Divider borderColor='whiteAlpha.200' />
        </Box>
      ))}
    </Box>
  )
}
