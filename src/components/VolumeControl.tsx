import { useMetronome } from '../context/MetronomeContext'
import { useTheme } from '../context/ThemeContext'
import type { CSSProperties } from 'react'

function VolumeIcon({ level, isDark }: { level: number; isDark: boolean }) {
  const color = isDark ? 'text-gray-400' : 'text-gray-500'

  if (level === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={color}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    )
  }
  if (level < 0.33) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={color}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    )
  }
  if (level < 0.66) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={color}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
        <path d="M19.07 4.93a10 10 0 010 14.14" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={color}>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  )
}

export function VolumeControl() {
  const { masterVolume, setVolume } = useMetronome()
  const { isDark } = useTheme()

  const labelColor = isDark ? 'text-gray-400' : 'text-gray-500'
  const trackBg = isDark ? '#374151' : '#d1d5db'
  const thumbBg = isDark ? '#fbbf24' : '#d97706'

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className={`block text-xs font-medium uppercase tracking-wider ${labelColor} mb-3 text-center`}>
        Volume
      </label>
      <div className="flex items-center gap-3">
        <VolumeIcon level={masterVolume} isDark={isDark} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={masterVolume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume slider"
          className="flex-1"
          style={{
            '--slider-track': trackBg,
            '--slider-thumb': thumbBg,
          } as CSSProperties}
        />
        <span className={`text-xs tabular-nums w-8 text-right ${labelColor}`}>
          {Math.round(masterVolume * 100)}
        </span>
      </div>
    </div>
  )
}
