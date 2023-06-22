import { Stat, StatArrow } from '@chakra-ui/react'
import { RadioGroup } from '@/components'
import { TransactionType } from '@/types'

export type CaptionProps = {
  currentType: TransactionType
  setCurrentType: (type: TransactionType) => void
}

export const Caption = ({ currentType, setCurrentType }: CaptionProps) => {
  return (
    <Stat>
      <RadioGroup
        onChange={(value) => setCurrentType(value as TransactionType)}
        value={currentType}
        options={[
          {
            value: 'outcome',
            label: (
              <>
                Gastos <StatArrow type='decrease' />
              </>
            ),
          },
          {
            value: 'income',
            label: (
              <>
                Ganhos <StatArrow type='increase' />
              </>
            ),
          },
        ]}
      ></RadioGroup>
    </Stat>
  )
}
