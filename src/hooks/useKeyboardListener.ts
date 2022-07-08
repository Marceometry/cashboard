import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'

export const useKeyboardListener = () => {
  const useShortcut = (
    baseKey: string,
    key: string,
    callback: (event: KeyboardEvent) => void,
    node = null
  ) => {
    const callbackRef = useRef(callback)
    useLayoutEffect(() => {
      callbackRef.current = callback
    })

    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        if (
          event.key === key &&
          event[`${baseKey}Key` as keyof KeyboardEvent]
        ) {
          callbackRef.current(event)
        }
      },
      [key]
    )

    useEffect(() => {
      const targetNode = node ?? document
      targetNode && targetNode.addEventListener('keydown', handleKeyPress)

      return () =>
        targetNode && targetNode.removeEventListener('keydown', handleKeyPress)
    }, [handleKeyPress, node])
  }

  const useShiftShortcut = (
    key: string,
    callback: (event: KeyboardEvent) => void,
    node = null
  ) => useShortcut('shift', key, callback, node)

  return { useShiftShortcut }
}
