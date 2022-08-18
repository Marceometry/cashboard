import { useState } from 'react'
import { useToast } from '@/hooks'

type Callback<T> = (args: T) => (Promise<any> | any)

type Options = {
  toastText?: string | ((data: any) => string)
  toastError?: string | ((data: any) => string)
}

export const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const generateToast = (toastText?: any, data?: any) => {
    if (!toastText) return
    return typeof toastText === 'function'
      ? toastText(data)
      : toastText
  }

  const call = <T = void>(callback: Callback<T>, options?: Options) => {
    return async (args: T) => {
      try {
        setIsLoading(true)
        const data = await callback(args)
        if (options?.toastText) {
          const text = generateToast(options.toastText, data)
          toast(text)
        }
      } catch (error) {
        console.warn(error)
        const text = generateToast(options?.toastError, error)
        toast(text || 'Algo deu errado', 'error')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return { call, isLoading, setIsLoading }
}
