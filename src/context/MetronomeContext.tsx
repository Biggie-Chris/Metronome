import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from 'react'
import type { MetronomeState } from '../types'
import { MetronomeEngine } from '../audio/engine'

interface MetronomeContextValue extends MetronomeState {
  togglePlay: () => void
  setBpm: (bpm: number) => void
  setBeatsPerMeasure: (beats: number) => void
  setVolume: (volume: number) => void
}

const MetronomeContext = createContext<MetronomeContextValue | null>(null)

export function MetronomeProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<MetronomeEngine>(new MetronomeEngine())

  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpmState] = useState(120)
  const [beatsPerMeasure, setBeatsPerMeasureState] = useState(4)
  const [masterVolume, setMasterVolumeState] = useState(0.7)
  const [currentBeat, setCurrentBeat] = useState(-1)

  const engine = engineRef.current

  const onBeatRef = useRef(setCurrentBeat)
  onBeatRef.current = setCurrentBeat

  useEffect(() => {
    engine.setOnBeat((beat: number) => onBeatRef.current(beat))
    return () => engine.destroy()
  }, [engine])

  useEffect(() => {
    engine.setBeatsPerMeasure(beatsPerMeasure)
  }, [beatsPerMeasure, engine])

  useEffect(() => {
    engine.updateBpm(bpm)
  }, [bpm, engine])

  const togglePlay = useCallback(() => {
    if (engine.isPlaying) {
      engine.stop()
      setIsPlaying(false)
      setCurrentBeat(-1)
    } else {
      engine.start(bpm, beatsPerMeasure, masterVolume)
      setIsPlaying(true)
    }
  }, [bpm, beatsPerMeasure, masterVolume, engine])

  const setBpm = useCallback((value: number) => {
    const clamped = Math.min(300, Math.max(30, value))
    setBpmState(clamped)
  }, [])

  const setBeatsPerMeasure = useCallback((beats: number) => {
    setBeatsPerMeasureState(beats)
  }, [])

  const setVolume = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value))
    setMasterVolumeState(clamped)
    engine.updateVolume(clamped)
  }, [engine])

  return (
    <MetronomeContext.Provider
      value={{
        isPlaying,
        bpm,
        beatsPerMeasure,
        masterVolume,
        currentBeat,
        togglePlay,
        setBpm,
        setBeatsPerMeasure,
        setVolume,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  )
}

export function useMetronome() {
  const ctx = useContext(MetronomeContext)
  if (!ctx) throw new Error('useMetronome must be used within MetronomeProvider')
  return ctx
}
