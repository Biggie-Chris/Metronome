import { useMetronome } from '../context/MetronomeContext'
import { useTheme } from '../context/ThemeContext'

const TIME_SIGNATURES = [
  { label: '2/4', beats: 2 },
  { label: '3/4', beats: 3 },
  { label: '4/4', beats: 4 },
  { label: '5/4', beats: 5 },
  { label: '6/8', beats: 6 },
  { label: '7/8', beats: 7 },
  { label: '9/8', beats: 9 },
  { label: '12/8', beats: 12 },
]

export function TimeSignatureSelect() {
  const { beatsPerMeasure, setBeatsPerMeasure } = useMetronome()
  const { isDark } = useTheme()

  const labelColor = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className={`block text-xs font-medium uppercase tracking-wider ${labelColor} mb-2 text-center`}>
        Time Signature
      </label>
      <div className="flex items-center justify-center gap-1.5 flex-wrap" role="radiogroup" aria-label="Time signature">
        {TIME_SIGNATURES.map(({ label, beats }) => {
          const isSelected = beats === beatsPerMeasure
          const activeBg = isDark
            ? 'bg-amber-400 text-gray-950'
            : 'bg-amber-600 text-white'
          const inactiveBg = isDark
            ? 'bg-gray-800 text-gray-300'
            : 'bg-white text-gray-700'
          const border = isDark ? 'border-gray-700' : 'border-gray-200'

          return (
            <button
              key={label}
              role="radio"
              aria-checked={isSelected}
              onClick={() => setBeatsPerMeasure(beats)}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium cursor-pointer active:scale-90 transition-all duration-150 select-none border ${
                isSelected ? activeBg + ' border-transparent shadow-sm' : inactiveBg + ' ' + border
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
