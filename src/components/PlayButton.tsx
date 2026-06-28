import { useMetronome } from '../context/MetronomeContext'
import { useTheme } from '../context/ThemeContext'

export function PlayButton() {
  const { isPlaying, togglePlay } = useMetronome()
  const { isDark } = useTheme()

  const bg = isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
  const border = isDark ? 'border-gray-700' : 'border-gray-200'
  const iconColor = isDark ? 'text-amber-400' : 'text-amber-600'

  return (
    <button
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${bg} ${border} border-2 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-150 shadow-lg`}
    >
      {isPlaying ? (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={iconColor}>
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={iconColor + ' ml-1'}>
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}
