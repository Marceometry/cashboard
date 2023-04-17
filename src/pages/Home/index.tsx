import { useEffect, useState } from 'react'
import { Center, Flex, Heading } from '@chakra-ui/react'
import { IconButton, Loading, MainTemplate } from '@/components'
import { useRecurrences, useTransactions } from '@/contexts'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadedDefaultCategories, setLoadedDefaultCategories] = useState(false)
  const [monthCount, setMonthCount] = useState(Number(storagedMonthCount) || 3)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    storagedFilterCategories || []
  )
  const { recurrenceList } = useRecurrences()
  const { transactionList, isLoading } = useTransactions()

  const [monthlyIncomes, monthlyOutcomes, installmentsOutcomes] =
    getMonthSummary(recurrenceList)
  const categories = generateCategories(transactionList, monthCount)

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
        justifyContent='space-around'
        alignItems='center'
        w='full'
        h='full'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Center flexDirection='column' w='full'>
              <Center mb='8'>
                <Heading size='lg'>Resumo mensal</Heading>
              </Center>
              <Flex w='full' gap='8' flexWrap='wrap'>
                <Stat
                  type='income'
                  label='Ganhos mensais'
                  value={monthlyIncomes}
                />
                <Stat
                  type='outcome'
                  label='Gastos mensais fixos'
                  value={monthlyOutcomes}
                />
                <Stat
                  type='outcome'
                  label='Parcelas ativas'
                  value={installmentsOutcomes}
                />
              </Flex>
            </Center>

            <Center flexDirection='column' w='full'>
              <Center my='8' gap='2'>
                <Heading size='lg' textAlign='center'>
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
                  />{' '}
                  meses)
                </Heading>
                <IconButton
                  icon='filter'
                  aria-label='Categorias para mostrar'
                  onClick={() => setIsModalOpen(true)}
                />
              </Center>
              <Flex w='full' gap='8' flexWrap='wrap'>
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
            </Center>

            <ModalCategoriesFilter
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              currentSelectedCategories={selectedCategories}
              handleFilter={(data) => {
                setSelectedCategories(data)
                storage.set('categories-average-outcome-filter', data)
              }}
            />
          </>
        )}
      </Flex>
    </MainTemplate>
  )
}
