import {
  Accordion as ChakraAccordion,
  AccordionProps,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
} from '@chakra-ui/react'

type Item = {
  key: number
  button: React.ReactNode
  panel: React.ReactNode
}

type Props = AccordionProps & {
  items: Item[]
}

export const Accordion = ({ items, ...props }: Props) => {
  return (
    <ChakraAccordion allowToggle {...props}>
      {items.map((item) => (
        <AccordionItem key={item.key}>
          <AccordionButton>
            <Flex flex='1'>{item.button}</Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>{item.panel}</AccordionPanel>
        </AccordionItem>
      ))}
    </ChakraAccordion>
  )
}
