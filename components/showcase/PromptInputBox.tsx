'use client'

import { ArrowUp, Loader2, Mic, Square } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from 'react'

const BAR_MAX_PX = 48
const BAR_MIN_PX = 4
const BAR_SLOT_PX = 8
const MIN_BARS = 16
const MAX_BARS = 256
const MAX_RECORDING_MS = 60_000

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Mirrored frequency bars for the live mic stream. Heights are written straight to the DOM each frame. */
function MicVisualizer({ stream }: { stream: MediaStream | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  const [barCount, setBarCount] = useState(MIN_BARS)
  const barCountRef = useRef(barCount)
  useLayoutEffect(() => {
    barCountRef.current = barCount
  }, [barCount])

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      if (w <= 0) return
      const n = Math.max(MIN_BARS, Math.min(MAX_BARS, Math.floor(w / BAR_SLOT_PX)))
      setBarCount((prev) => (prev === n ? prev : n))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!stream) return
    const AudioCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtor) return
    const ctx = new AudioCtor()
    const source = ctx.createMediaStreamSource(stream)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0.6
    source.connect(analyser)
    const buf = new Uint8Array(analyser.frequencyBinCount)
    const heights = new Float32Array(Math.ceil(MAX_BARS / 2))
    let raf = 0
    const tick = () => {
      analyser.getByteFrequencyData(buf)
      const n = barCountRef.current
      const half = Math.ceil(n / 2)
      const step = Math.max(1, Math.floor(buf.length / half))
      for (let k = 0; k < half; k++) {
        let sum = 0
        for (let j = 0; j < step; j++) sum += buf[k * step + j] ?? 0
        heights[k] = Math.max(BAR_MIN_PX, Math.round((sum / step / 255) * BAR_MAX_PX))
      }
      const center = (n - 1) / 2
      for (let i = 0; i < n; i++) {
        const idx = Math.min(half - 1, Math.round(Math.abs(i - center)))
        const bar = barsRef.current[i]
        if (bar) bar.style.height = `${heights[idx] ?? BAR_MIN_PX}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      try {
        source.disconnect()
        analyser.disconnect()
      } catch {}
      ctx.close().catch(() => {})
    }
  }, [stream])

  return (
    <div ref={containerRef} className="flex h-12 w-full items-center justify-between" aria-hidden>
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            barsRef.current[i] = el
          }}
          className="w-[5px] rounded-full bg-white/90 transition-[height] duration-100 ease-out"
          style={{ height: BAR_MIN_PX }}
        />
      ))}
    </div>
  )
}

/** CSS-only tooltip: shows above its child on hover or keyboard focus. */
function Tip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 translate-y-1 rounded-md bg-zinc-900 px-1.5 py-1 text-xs whitespace-nowrap text-white opacity-0 transition duration-150 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-has-focus-visible/tip:translate-y-0 group-has-focus-visible/tip:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}

function pickAudioMime(): string {
  if (typeof MediaRecorder === 'undefined') return ''
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus']
  return candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? ''
}

type Mode = 'idle' | 'recording' | 'transcribing'

export type PromptBoxProps = {
  className?: string
  placeholder?: string
  disabled?: boolean
  onSubmit?: (value: string) => void
  onStop?: () => void
  /** Turns a recorded clip into text. Without it, the mic records and shows the waveform only. */
  onTranscribe?: (blob: Blob) => Promise<string>
  ref?: Ref<HTMLTextAreaElement>
}

/**
 * Voice-first prompt box. Type, or hold Option anywhere (while the box is on screen) to talk: a live
 * waveform replaces the input and a red glow pulses until you let go.
 */
export function PromptBox({
  className = '',
  placeholder = 'Message...',
  disabled,
  onSubmit,
  onStop,
  onTranscribe,
  ref,
}: PromptBoxProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLSpanElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState('')
  const [mode, setMode] = useState<Mode>('idle')
  const [stream, setStream] = useState<MediaStream | null>(null)

  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const timeoutRef = useRef<number | null>(null)
  const focusOnIdleRef = useRef(false)
  const stopRequestedRef = useRef(false)
  const visibleRef = useRef(false)
  const modeRef = useRef(mode)
  // Read by the recorder callbacks, which can fire after an await.
  useLayoutEffect(() => {
    modeRef.current = mode
  }, [mode])

  const resizeTextarea = useCallback((node: HTMLTextAreaElement | null) => {
    if (!node) return
    node.style.height = 'auto'
    node.style.height = `${Math.min(node.scrollHeight, Math.floor(window.innerHeight * 0.5))}px`
  }, [])

  const attachTextarea = useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
      resizeTextarea(node)
    },
    [ref, resizeTextarea],
  )

  useLayoutEffect(() => {
    if (mode !== 'idle') return
    resizeTextarea(textareaRef.current)
    if (focusOnIdleRef.current) {
      focusOnIdleRef.current = false
      const ta = textareaRef.current
      if (ta) {
        ta.focus()
        ta.setSelectionRange(ta.value.length, ta.value.length)
      }
    }
  }, [value, mode, resizeTextarea])

  // Each mode's content fades up into place, and recording pulses a red ring.
  useEffect(() => {
    if (prefersReducedMotion()) return
    bodyRef.current?.animate(
      [
        { opacity: 0, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 180, easing: 'ease-out' },
    )
    if (mode !== 'recording') return
    const pulse = pulseRef.current?.animate(
      [{ boxShadow: '0 0 0 0 rgba(239,68,68,0.45)' }, { boxShadow: '0 0 0 14px rgba(239,68,68,0)' }],
      { duration: 1400, easing: 'ease-out', iterations: Infinity },
    )
    return () => pulse?.cancel()
  }, [mode])

  const cleanupRecording = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    recorderRef.current?.stream.getTracks().forEach((t) => t.stop())
    recorderRef.current = null
    setStream(null)
    chunksRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      const rec = recorderRef.current
      if (rec && rec.state !== 'inactive') {
        try {
          rec.stop()
        } catch {}
      }
      cleanupRecording()
    }
  }, [cleanupRecording])

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSubmit?.(value)
    setValue('')
  }

  const transcribeBlob = async (blob: Blob) => {
    if (!onTranscribe) {
      setMode('idle')
      return
    }
    setMode('transcribing')
    try {
      const spoken = (await onTranscribe(blob)).trim()
      if (!spoken) return
      setValue((prev) => (prev.trim() ? `${prev.trimEnd()} ${spoken}` : spoken))
      focusOnIdleRef.current = true
    } catch (err) {
      console.error('[transcribe] failed', err)
    } finally {
      setMode('idle')
    }
  }

  const stopRecording = useCallback(() => {
    const rec = recorderRef.current
    if (!rec || rec.state === 'inactive') return
    try {
      rec.stop()
    } catch (err) {
      console.error('[mic] stop failed', err)
      cleanupRecording()
      setMode('idle')
    }
  }, [cleanupRecording])

  const startRecording = async () => {
    if (disabled || modeRef.current !== 'idle') return
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('[mic] getUserMedia unavailable')
      return
    }
    let micStream: MediaStream
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      console.error('[mic] permission denied', err)
      stopRequestedRef.current = false
      return
    }
    setStream(micStream)
    const mime = pickAudioMime()
    let recorder: MediaRecorder
    try {
      recorder = new MediaRecorder(micStream, mime ? { mimeType: mime } : undefined)
    } catch (err) {
      console.error('[mic] MediaRecorder failed', err)
      micStream.getTracks().forEach((t) => t.stop())
      setStream(null)
      return
    }
    chunksRef.current = []
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mime || 'audio/webm' })
      cleanupRecording()
      if (blob.size > 0) void transcribeBlob(blob)
      else setMode('idle')
    }
    recorderRef.current = recorder
    recorder.start()
    setMode('recording')
    timeoutRef.current = window.setTimeout(stopRecording, MAX_RECORDING_MS)
    // Option was released while the mic permission prompt was open.
    if (stopRequestedRef.current) {
      stopRequestedRef.current = false
      stopRecording()
    }
  }

  // Push-to-talk only while the box is on screen, so Option keeps working normally elsewhere.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = !!entry && entry.intersectionRatio > 0
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== 'Alt' || e.repeat || disabled || !visibleRef.current) return
    if (modeRef.current !== 'idle') return
    e.preventDefault()
    stopRequestedRef.current = false
    void startRecording()
  })

  const onKeyUp = useEffectEvent((e: KeyboardEvent) => {
    if (e.key !== 'Alt') return
    if (modeRef.current === 'recording') stopRecording()
    else if (modeRef.current === 'idle') stopRequestedRef.current = true
  })

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const hasValue = value.trim().length > 0
  const ring = 'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none'

  return (
    <div
      ref={rootRef}
      className={`relative flex cursor-text flex-col rounded-2xl border bg-[#242424] p-2.5 text-white shadow-lg shadow-black/20 transition-all duration-200 focus-within:border-white/15 focus-within:ring-1 focus-within:ring-white/10 ${mode === 'recording' ? 'border-red-500/40' : 'border-white/[0.06]'} ${className}`}
    >
      {mode === 'recording' && (
        <span ref={pulseRef} aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl" />
      )}
      <div ref={bodyRef}>
        {mode === 'recording' ? (
          <div className="flex min-h-[80px] items-center gap-2 p-2">
            <div className="flex flex-1 items-center overflow-hidden">
              <MicVisualizer stream={stream} />
            </div>
            <button
              type="button"
              onClick={stopRecording}
              className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-red-500 text-white transition-colors hover:bg-red-500/90 ${ring}`}
            >
              <Square className="size-3.5 fill-current" aria-hidden />
              <span className="sr-only">Stop dictation</span>
            </button>
          </div>
        ) : mode === 'transcribing' ? (
          <div className="flex min-h-[80px] items-center justify-center gap-2 p-2 text-sm text-neutral-400">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span>Transcribing…</span>
          </div>
        ) : (
          <>
            <textarea
              ref={attachTextarea}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder={placeholder}
              disabled={disabled}
              aria-label={placeholder}
              className="min-h-14 w-full resize-none border-0 bg-transparent p-3 font-[inherit] text-[15px] text-white placeholder:text-neutral-500 focus:ring-0 focus-visible:outline-none"
            />
            <div className="flex items-center gap-1.5 p-1 pt-0">
              <Tip label="Click to dictate, or hold Option to speak">
                <button
                  type="button"
                  onClick={() => void startRecording()}
                  disabled={disabled}
                  className={`flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-neutral-400 transition-colors hover:bg-white/5 disabled:pointer-events-none disabled:opacity-50 ${ring}`}
                >
                  <Mic className="size-3.5" aria-hidden />
                  <span className="sr-only">Start dictation</span>
                </button>
              </Tip>
              <div className="ml-auto">
                {disabled && onStop ? (
                  <Tip label="Stop">
                    <button
                      type="button"
                      onClick={onStop}
                      className={`flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-red-500 text-white transition-colors hover:bg-red-500/90 ${ring}`}
                    >
                      <Square className="size-3 fill-current" aria-hidden />
                      <span className="sr-only">Stop</span>
                    </button>
                  </Tip>
                ) : (
                  <Tip label="Send">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!hasValue || disabled}
                      className={`flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-black transition-colors hover:bg-white/90 disabled:pointer-events-none disabled:bg-white/10 disabled:text-neutral-500 ${ring}`}
                    >
                      <ArrowUp className="size-5" aria-hidden />
                      <span className="sr-only">Send message</span>
                    </button>
                  </Tip>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
