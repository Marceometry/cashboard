import { ControlledRadioGroup } from './Controlled'
import { UncontrolledRadioGroup } from './Uncontrolled'

export type RadioOption = {
  label: React.ReactNode
  value: string
}

type Props = {
  options: RadioOption[]
  name?: string
  label?: string
  gap?: number | string
  rowGap?: number | string
  columnGap?: number | string
  columns?: number
  required?: boolean
  value?: string
  onChange?: (nextValue: string) => void
}

export const RadioGroup = (props: Props) =>
  props.onChange ? (
    <ControlledRadioGroup {...props} />
  ) : (
    <UncontrolledRadioGroup {...props} />
  )
