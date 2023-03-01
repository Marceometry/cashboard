import {
  Tabs as ChakraTabs,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabsProps,
} from '@chakra-ui/react'

type Tab = {
  key: string | number
  label: string | React.ReactNode
  content: React.ReactNode
}

type Props = Omit<TabsProps, 'children'> & {
  tabs: Tab[]
}

export const Tabs = ({ tabs, ...props }: Props) => {
  return (
    <ChakraTabs
      isFitted
      display='flex'
      flexDirection='column'
      overflow='hidden'
      p='1'
      {...props}
    >
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.key} fontSize={{ base: 'sm', sm: 'md' }}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels flex='1' display='flex' overflow='hidden'>
        {tabs.map((tab) => (
          <TabPanel key={tab.key} flex='1' display='flex' overflow='hidden'>
            <Flex gap='4' w='100%' flex='1' overflow='auto'>
              {tab.content}
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  )
}
