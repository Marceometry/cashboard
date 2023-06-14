import { useState } from 'react'
import { useToast } from '@/hooks'

type ToastText = string | ((data: any) => string)

type Callback<T> = (args: T) => Promise<any> | any

type Options = {
  toastText?: ToastText
  toastError?: ToastText
  toastDuration?: number | null
  toastSuccessAsInfo?: boolean
  startInfoToast?: string
}

export const useApiCall = (startLoadingState = true) => {
  const [isLoading, setIsLoading] = useState(startLoadingState)
  const toast = useToast()

  const generateToast = (data?: any, text?: ToastText) => {
    if (!text) return
    return typeof text === 'function' ? text(data) : text
  }

  const call = <T = void>(callback: Callback<T>, options?: Options) => {
    return async (args: T) => {
      try {
        const info = options?.startInfoToast
        const closeToast = info && toast(info, 'info')
        setIsLoading(true)
        const data = await callback(args)
        if (closeToast) closeToast()
        if (options?.toastText) {
          const text = generateToast(data, options.toastText)
          toast(
            text,
            options.toastSuccessAsInfo ? 'info' : 'success',
            options.toastDuration
          )
        }
        return data
      } catch (error) {
        console.warn(error)
        const text = generateToast(error, options?.toastError)
        toast(text || 'Algo deu errado', 'error', options?.toastDuration)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return { call, isLoading, setIsLoading }
}
