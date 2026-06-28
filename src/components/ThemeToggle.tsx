import { useTheme } from '../context/ThemeContext'

const ICONS: Record<string, string> = {
  system: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z',
  dark: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z',
  light: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-9 4H1v2h2v-2zm18 0h2v2h-2v-2zm-2.36-4.36l-1.41-1.41-1.06 1.06 1.41 1.41 1.06-1.06zM4.34 17.66l-1.06-1.06 1.41-1.41 1.06 1.06-1.41 1.41zM4.34 6.34l1.41-1.41 1.06 1.06-1.41 1.41-1.06-1.06zm12.32 12.32l1.41-1.41 1.06 1.06-1.41 1.41-1.06-1.06z',
}

const LABELS: Record<string, string> = {
  system: 'Follow system theme',
  dark: 'Switch to light mode',
  light: 'Switch to dark mode',
}

export function ThemeToggle() {
  const { mode, setMode } = useTheme()

  const nextMode = mode === 'system' ? 'dark' : mode === 'dark' ? 'light' : 'system'

  return (
    <button
      onClick={() => setMode(nextMode)}
      aria-label={LABELS[mode]}
      title={LABELS[mode]}
      className="absolute top-4 right-4 p-2 rounded-lg opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d={ICONS[mode]} />
      </svg>
    </button>
  )
}
