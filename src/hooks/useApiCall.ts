import { useState } from 'react'
import { useToast } from '@/hooks'

type Callback<T> = (args: T) => Promise<any>

type Options = {
  toastText: string | ((data: any) => string)
}

export const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const call = <T = void>(callback: Callback<T>, options?: Options) => {
    return async (args: T) => {
      try {
        setIsLoading(true)
        const data = await callback(args)
        if (options?.toastText) {
          const text =
            typeof options.toastText === 'function'
              ? options.toastText(data)
              : options.toastText
          toast(text)
        }
      } catch (error) {
        console.log(error)
        toast('Algo deu errado', 'error')
        setIsLoading(false)
      }
    }
  }

  return { call, isLoading, setIsLoading }
}
