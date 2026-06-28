import { ThemeProvider, useTheme } from './context/ThemeContext'
import { MetronomeProvider } from './context/MetronomeContext'
import { ThemeToggle } from './components/ThemeToggle'
import { BeatIndicator } from './components/BeatIndicator'
import { PlayButton } from './components/PlayButton'
import { BpmControl } from './components/BpmControl'
import { TimeSignatureSelect } from './components/TimeSignatureSelect'
import { VolumeControl } from './components/VolumeControl'

function AppContent() {
  const { isDark } = useTheme()

  const bg = isDark ? 'bg-gray-950' : 'bg-gray-50'
  const text = isDark ? 'text-gray-100' : 'text-gray-900'
  const cardBg = isDark ? 'bg-gray-900' : 'bg-white'
  const cardBorder = isDark ? 'border-gray-800' : 'border-gray-200'

  return (
    <div className={`min-h-dvh ${bg} ${text} flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-300 relative`}>
      <ThemeToggle />

      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-8 sm:gap-10">
        <h1 className="text-sm font-medium uppercase tracking-[0.2em] opacity-40">
          Metronome
        </h1>

        <BeatIndicator />

        <PlayButton />

        <BpmControl />

        <div className={`w-full ${cardBg} rounded-2xl ${cardBorder} border p-4 sm:p-5 space-y-5`}>
          <TimeSignatureSelect />
          <VolumeControl />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MetronomeProvider>
        <AppContent />
      </MetronomeProvider>
    </ThemeProvider>
  )
}
