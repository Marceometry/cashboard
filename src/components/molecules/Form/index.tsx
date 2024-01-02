import { CSSProperties } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useKeyboardListener } from '@/hooks'

type Props = {
  children: React.ReactNode
  formMethods: UseFormReturn<any, object>
  onSubmit: (data?: any) => void
  onShiftSubmit?: () => void
  style?: CSSProperties
}

export const Form = ({
  onSubmit,
  onShiftSubmit,
  formMethods,
  children,
  style,
}: Props) => {
  const { useShiftShortcut } = useKeyboardListener()

  useShiftShortcut(() => onShiftSubmit?.(), 'Enter')

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        style={{ height: '100%', ...style }}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export * from './FormFooter'
