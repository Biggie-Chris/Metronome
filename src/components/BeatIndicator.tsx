import { useMetronome } from '../context/MetronomeContext'
import { useTheme } from '../context/ThemeContext'

export function BeatIndicator() {
  const { beatsPerMeasure, currentBeat } = useMetronome()
  const { isDark } = useTheme()

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" role="list" aria-label="Beat indicator">
      {Array.from({ length: beatsPerMeasure }, (_, i) => {
        const isActive = i === currentBeat
        const isAccent = i === 0
        const size = isAccent ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-3 h-3 sm:w-4 sm:h-4'

        let color: string
        if (isActive) {
          color = isDark ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.4)]'
        } else {
          color = isDark ? 'bg-gray-600' : 'bg-gray-300'
        }

        const transition = isActive ? 'scale-110' : 'scale-100'

        return (
          <div
            key={i}
            role="listitem"
            aria-label={`Beat ${i + 1}${isAccent ? ' (accent)' : ''}${isActive ? ' — playing' : ''}`}
            className={`rounded-full ${size} ${color} transition-all duration-75 ${transition}`}
          />
        )
      })}
    </div>
  )
}
