import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

type Callback = (event?: KeyboardEvent) => void

type BaseKey = 'shift' | 'ctrl' | 'alt'

export const useKeyboardListener = () => {
  const useShortcut = (
    baseKey: BaseKey,
    key: string,
    callback: Callback,
    node = null
  ) => {
    const callbackRef = useRef(callback)
    useLayoutEffect(() => {
      callbackRef.current = callback
    })

    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === key && event[`${baseKey}Key`]) {
          callbackRef.current(event)
        }
      },
      [key]
    )

    useEffect(() => {
      const targetNode = node ?? document
      targetNode && targetNode.addEventListener('keydown', handleKeyPress)

      return () => {
        targetNode && targetNode.removeEventListener('keydown', handleKeyPress)
      }
    }, [handleKeyPress, node])

    return () => callback()
  }

  const useShiftShortcut = (callback: Callback, key: string, node = null) => {
    return useShortcut('shift', key, callback, node)
  }

  return { useShiftShortcut }
}
