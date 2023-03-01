import { FormProvider, UseFormReturn } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  formMethods: UseFormReturn<any, object>
  onSubmit: (data?: any) => void
}

export const Form = ({ onSubmit, formMethods, children }: Props) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
