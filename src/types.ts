export type BeatCallback = (beat: number) => void

export interface MetronomeState {
  isPlaying: boolean
  bpm: number
  beatsPerMeasure: number
  masterVolume: number
  currentBeat: number
}
