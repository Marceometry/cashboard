import {
  Tabs as ChakraTabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsProps,
  Flex,
} from '@chakra-ui/react'

type Tab = {
  label: string
  content: React.ReactNode
}

type Props = Omit<TabsProps, 'children'> & {
  tabs: Tab[]
}

export const Tabs = ({ tabs, ...props }: Props) => {
  return (
    <ChakraTabs isFitted {...props}>
      <TabList mb='4'>
        {tabs.map((tab) => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel>
            <Flex gap='4' w='100%'>
              {tab.content}
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  )
}
