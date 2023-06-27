import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Badge,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { EmptyData, IconButton, Loading, MainTemplate } from '@/components'
import { useAuth, useRecurrences, useTransactions } from '@/contexts'
import { useLocalStorage } from '@/hooks'
import { InputNumber, ModalCategoriesFilter, Stat } from './components'
import { generateCategories, getMonthSummary } from './utils'

export const Home = () => {
  const storage = useLocalStorage()
  const storagedMonthCount = storage.get(
    'categories-average-month-count-filter'
  )
  const storagedFilterCategories = storage.get(
    'categories-average-outcome-filter'
  )
  const badgeColor = useColorModeValue('green.500', 'green.400')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadedDefaultCategories, setLoadedDefaultCategories] = useState(false)
  const [monthCount, setMonthCount] = useState(Number(storagedMonthCount) || 3)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    storagedFilterCategories || []
  )
  const { user } = useAuth()
  const { recurrenceList } = useRecurrences()
  const { transactionList, dateParam, isLoadingCache } = useTransactions()

  const [monthlyIncomes, monthlyOutcomes, installmentsOutcomes] =
    getMonthSummary(recurrenceList)
  const categories = generateCategories(transactionList, monthCount, dateParam)

  useEffect(() => {
    if (
      categories.length &&
      !storagedFilterCategories &&
      !loadedDefaultCategories
    ) {
      setSelectedCategories(categories.slice(0, 3).map((item) => item.name))
      setLoadedDefaultCategories(true)
    }
  }, [categories])

  return (
    <MainTemplate>
      <Flex
        flexDirection='column'
        justifyContent={{ base: 'space-between', sm: 'space-around' }}
        alignItems='center'
        w='full'
        h='full'
      >
        {isLoadingCache ? (
          <Loading />
        ) : !transactionList.length ? (
          <Center flexDirection='column' gap='12'>
            <Heading size='xl'>Bem vindo, {user?.name}!</Heading>
            <EmptyData message='Por enquanto, ainda não há dados para exibir.' />
            <Text fontSize='1.5rem'>
              Vá até a aba{' '}
              <Link to='/transactions'>
                <Badge
                  display='inline-block'
                  color={badgeColor}
                  py='1'
                  px='2'
                  _hover={{ textDecoration: 'underline' }}
                >
                  Transações
                </Badge>
              </Link>{' '}
              para cadastrar sua primeira transação.
            </Text>
          </Center>
        ) : (
          <>
            {!!recurrenceList.length && (
              <Center flexDirection='column' w='full'>
                <Center mt='4' mb='8'>
                  <Heading size='lg'>Resumo mensal</Heading>
                </Center>
                <Flex
                  w='full'
                  gap='8'
                  flexWrap='wrap'
                  flexDir={{ base: 'column', sm: 'row' }}
                >
                  {!!monthlyIncomes && (
                    <Stat
                      type='income'
                      label='Ganhos mensais'
                      value={monthlyIncomes}
                    />
                  )}
                  {!!monthlyOutcomes && (
                    <Stat
                      type='outcome'
                      label='Gastos mensais fixos'
                      value={monthlyOutcomes}
                    />
                  )}
                  {!!installmentsOutcomes && (
                    <Stat
                      type='outcome'
                      label='Parcelas ativas'
                      value={installmentsOutcomes}
                    />
                  )}
                </Flex>
              </Center>
            )}

            <Center flexDirection='column' w='full'>
              <Center my='8' gap='2'>
                <Heading
                  style={{ lineHeight: 1.5 }}
                  size={{ base: 'md', sm: 'lg' }}
                  textAlign='center'
                >
                  Gasto médio por categoria (últimos{' '}
                  <InputNumber
                    value={monthCount}
                    onChange={(value) => {
                      setMonthCount(Number(value))
                      storage.set(
                        'categories-average-month-count-filter',
                        value
                      )
                    }}
                    size={{ base: 'sm', sm: 'md' }}
                  />{' '}
                  meses)
                </Heading>
                <IconButton
                  icon='filter'
                  aria-label='Categorias para mostrar'
                  onClick={() => setIsModalOpen(true)}
                />
              </Center>
              <Flex
                w='full'
                gap='8'
                mb='4'
                flexWrap='wrap'
                flexDir={{ base: 'column', sm: 'row' }}
              >
                {selectedCategories.map((item) => {
                  const category = categories.find((c) => c.name === item)
                  if (!category) return null
                  return (
                    <Stat
                      key={item}
                      type='outcome'
                      label={category.name}
                      value={category.average}
                    />
                  )
                })}
              </Flex>

              <ModalCategoriesFilter
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentSelectedCategories={selectedCategories}
                handleFilter={(data) => {
                  setSelectedCategories(data)
                  storage.set('categories-average-outcome-filter', data)
                }}
              />
            </Center>
          </>
        )}
      </Flex>
    </MainTemplate>
  )
}
