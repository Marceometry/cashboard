import { Radio, RadioGroup, Stack, Stat, StatArrow } from '@chakra-ui/react'
import { TransactionType } from '@/contexts'
import { FilterModel } from '../constants'

type Props = {
  currentType: TransactionType
  setCurrentType: (type: TransactionType) => void
}

export const Caption = ({ currentType, setCurrentType }: Props) => {
  return (
    <RadioGroup onChange={setCurrentType} value={currentType}>
      <Stat>
        <Stack direction='row'>
          <Radio value='outcome'>
            Gastos <StatArrow type='decrease' />
          </Radio>
          <Radio value='income'>
            Ganhos <StatArrow type='increase' />
          </Radio>
        </Stack>
      </Stat>
    </RadioGroup>
  )
}
