import { useCallback } from 'react'
import { useMetronome } from '../context/MetronomeContext'
import { useTheme } from '../context/ThemeContext'
import { useLongPress } from '../hooks/useLongPress'

export function BpmControl() {
  const { bpm, setBpm } = useMetronome()
  const { isDark } = useTheme()

  const onBpmStep = useCallback(
    (direction: 1 | -1) => setBpm(bpm + direction),
    [bpm, setBpm]
  )

  const incLongPress = useLongPress(() => onBpmStep(1))
  const decLongPress = useLongPress(() => onBpmStep(-1))

  const bg = isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
  const labelColor = isDark ? 'text-gray-400' : 'text-gray-500'
  const border = isDark ? 'border-gray-700' : 'border-gray-200'
  const trackBg = isDark ? '#374151' : '#d1d5db'
  const thumbBg = isDark ? '#fbbf24' : '#d97706'

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className={`block text-xs font-medium uppercase tracking-wider ${labelColor} mb-3 text-center`}>
        BPM
      </label>

      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          aria-label="Decrease BPM"
          onPointerDown={() => decLongPress.start(-1)}
          onPointerUp={decLongPress.stop}
          onPointerLeave={decLongPress.stop}
          className={`w-10 h-10 rounded-full ${bg} ${border} border flex items-center justify-center cursor-pointer active:scale-90 transition-transform text-lg font-bold select-none`}
        >
          −
        </button>

        <span className={`text-5xl sm:text-6xl font-bold tabular-nums w-28 text-center ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          {bpm}
        </span>

        <button
          aria-label="Increase BPM"
          onPointerDown={() => incLongPress.start(1)}
          onPointerUp={incLongPress.stop}
          onPointerLeave={incLongPress.stop}
          className={`w-10 h-10 rounded-full ${bg} ${border} border flex items-center justify-center cursor-pointer active:scale-90 transition-transform text-lg font-bold select-none`}
        >
          +
        </button>
      </div>

      <input
        type="range"
        min={30}
        max={300}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        aria-label="BPM slider"
        className="w-full"
        style={{
          '--slider-track': trackBg,
          '--slider-thumb': thumbBg,
        } as React.CSSProperties}
      />
    </div>
  )
}
