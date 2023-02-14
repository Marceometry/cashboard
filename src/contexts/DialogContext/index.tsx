import { createContext, useContext, useState, ReactNode } from 'react'
import { Dialog, DialogProps as DialogComponentProps } from '@/components'

type DialogProps = Omit<DialogComponentProps, 'isOpen' | 'onClose'>

const defaultDialogProps: DialogProps = {
  title: '',
  body: '',
}

export type DialogContextData = {
  isDialogOpen: boolean
  openDialog: (props: DialogProps) => void
  closeDialog: () => void
}

export type DialogContextProviderProps = {
  children: ReactNode
}

export const DialogContext = createContext({} as DialogContextData)

export function DialogContextProvider({
  children,
}: DialogContextProviderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogProps, setDialogProps] =
    useState<DialogProps>(defaultDialogProps)

  const openDialog = (props: DialogProps) => {
    setDialogProps(props)
    setIsDialogOpen(true)
  }

  const closeDialog = () => setIsDialogOpen(false)

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        isDialogOpen,
      }}
    >
      {children}

      <Dialog {...dialogProps} isOpen={isDialogOpen} onClose={closeDialog} />
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)
