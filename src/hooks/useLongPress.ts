import { useRef, useCallback } from 'react'

export function useLongPress(
  onStep: (direction: 1 | -1) => void,
  stepInterval = 100
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(
    (direction: 1 | -1) => {
      onStep(direction)
      intervalRef.current = setInterval(() => onStep(direction), stepInterval)
    },
    [onStep, stepInterval]
  )

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return { start, stop }
}
