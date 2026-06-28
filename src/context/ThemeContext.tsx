import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

type ThemeMode = 'system' | 'dark' | 'light'

interface ThemeContextValue {
  isDark: boolean
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  mode: 'system',
  setMode: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system')
  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isDark = mode === 'system' ? systemDark : mode === 'dark'

  const handleSetMode = useCallback((m: ThemeMode) => setMode(m), [])

  return (
    <ThemeContext.Provider value={{ isDark, mode, setMode: handleSetMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
