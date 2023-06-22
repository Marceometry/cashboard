import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useKeyboardListener } from '@/hooks'

type Props = {
  children: React.ReactNode
  formMethods: UseFormReturn<any, object>
  onSubmit: (data?: any) => void
  onShiftSubmit?: () => void
}

export const Form = ({
  onSubmit,
  onShiftSubmit,
  formMethods,
  children,
}: Props) => {
  const { useShiftShortcut } = useKeyboardListener()

  useShiftShortcut(() => onShiftSubmit?.(), 'Enter')

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        style={{ height: '100%' }}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export * from './FormFooter'
