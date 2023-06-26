import { useEffect, useState } from 'react'
import { useToast } from '@/hooks'

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(false)
  const toast = useToast()

  const setOnline = () => {
    setIsOnline(true)
    toast('Você está online')
  }

  const setOffline = () => {
    setIsOnline(false)
    toast('Você está offline', 'warning')
  }

  useEffect(() => {
    navigator.onLine ? setIsOnline(true) : setOffline()

    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  return isOnline
}
