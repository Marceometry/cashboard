import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Center,
  Divider,
} from '@chakra-ui/react'
import { Card, Stat } from '@/components'

const tabs = {
  TOTAL: {
    earned: {
      value: 9103.7,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 9103.7,
      percentage: 23.36,
    },
  },
  THIS_MONTH: {
    earned: {
      value: 2503,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 407.6,
      percentage: 17.76,
    },
  },
  LAST_MONTH: {
    earned: {
      value: 4678.37,
      percentage: 23.36,
      increase: true,
    },
    spent: {
      value: 1097,
      percentage: 23.36,
    },
  },
}

const Panel = (props: any) => (
  <Flex gap='4' w='100%'>
    <Stat label='Adquirido' {...props.earned} />
    <Center>
      <Divider orientation='vertical' />
    </Center>
    <Stat label='Gasto' isSpent {...props.spent} />
  </Flex>
)

export const Earnings = () => {
  return (
    <Card>
      <Tabs>
        <TabList mb='4'>
          <Tab>Total</Tab>
          {tabs['THIS_MONTH'] && <Tab>Este mês</Tab>}
          {tabs['LAST_MONTH'] && <Tab>Mês passado</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Panel {...tabs['TOTAL']} />
          </TabPanel>
          {tabs['THIS_MONTH'] && (
            <TabPanel>
              <Panel {...tabs['THIS_MONTH']} />
            </TabPanel>
          )}
          {tabs['LAST_MONTH'] && (
            <TabPanel>
              <Panel {...tabs['LAST_MONTH']} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Card>
  )
}
