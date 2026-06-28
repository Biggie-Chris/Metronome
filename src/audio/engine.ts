import type { BeatCallback } from '../types'

const SCHEDULE_AHEAD_TIME = 0.1
const INTERVAL_MS = 25
const ACCENT_FREQ = 1200
const NORMAL_FREQ = 800
const DECAY_TIME = 0.05
const ACCENT_VOLUME_MULT = 1.5

export class MetronomeEngine {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private _isPlaying = false
  private nextNoteTime = 0
  private currentBeat = 0
  private beatsPerMeasure = 4
  private _bpm = 120
  private intervalId: ReturnType<typeof setInterval> | null = null
  private onBeat: BeatCallback | null = null
  private _volume = 0.7

  setOnBeat(callback: BeatCallback) {
    this.onBeat = callback
  }

  get isPlaying() {
    return this._isPlaying
  }

  private getOrCreateContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.gain.value = this._volume
      this.masterGain.connect(this.audioContext.destination)
    }
    return this.audioContext
  }

  start(bpm: number, beatsPerMeasure: number, volume: number) {
    if (this._isPlaying) return

    const ctx = this.getOrCreateContext()

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    this._isPlaying = true
    this._bpm = bpm
    this.beatsPerMeasure = beatsPerMeasure
    this.currentBeat = 0
    this.nextNoteTime = ctx.currentTime
    this._volume = volume
    this.masterGain!.gain.value = volume

    this.intervalId = setInterval(() => this.scheduler(), INTERVAL_MS)
  }

  stop() {
    this._isPlaying = false
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.currentBeat = 0
    this.onBeat?.(-1)
  }

  updateVolume(volume: number) {
    this._volume = volume
    this.getOrCreateContext()
    this.masterGain!.gain.value = volume
  }

  updateBpm(bpm: number) {
    this._bpm = bpm
  }

  setBeatsPerMeasure(beats: number) {
    if (this.beatsPerMeasure === beats) return
    this.beatsPerMeasure = beats
    if (this.currentBeat >= beats) {
      this.currentBeat = 0
    }
  }

  destroy() {
    this.stop()
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
      this.masterGain = null
    }
  }

  private scheduler() {
    const ctx = this.audioContext
    if (!ctx || !this._isPlaying) return

    const beatDuration = 60 / this._bpm
    const currentTime = ctx.currentTime

    while (this.nextNoteTime < currentTime + SCHEDULE_AHEAD_TIME) {
      this.scheduleClick(this.nextNoteTime, this.currentBeat)
      this.nextNoteTime += beatDuration
      this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure
    }
  }

  private scheduleClick(time: number, beatNumber: number) {
    const ctx = this.audioContext!
    const isAccent = beatNumber === 0
    const freq = isAccent ? ACCENT_FREQ : NORMAL_FREQ

    const osc = ctx.createOscillator()
    const envGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = freq

    const volume = isAccent ? ACCENT_VOLUME_MULT : 1.0
    envGain.gain.setValueAtTime(volume, time)
    envGain.gain.exponentialRampToValueAtTime(0.001, time + DECAY_TIME)

    osc.connect(envGain)
    envGain.connect(this.masterGain!)

    osc.start(time)
    osc.stop(time + DECAY_TIME + 0.01)

    this.onBeat?.(beatNumber)
  }
}
