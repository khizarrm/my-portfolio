'use client'

import { Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Only one video plays at a time; starting one pauses whichever was playing.
let current: HTMLVideoElement | null = null

/**
 * Minimal self-hosted video: the poster until clicked, no browser controls or spinner. Click to
 * play or pause; a thin line tracks progress, and a mute toggle shows on hover. `autoPlay` starts
 * it as soon as it mounts (used in the full-screen viewer, opened by a click).
 */
export function VideoPlayer({
  src,
  poster,
  label,
  autoPlay = false,
}: {
  src: string
  poster?: string
  label: string
  autoPlay?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(true)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let frame = 0

    // Progress is written straight to the bar every frame, without re-rendering.
    const track = () => {
      if (progressRef.current && video.duration) {
        progressRef.current.style.scale = `${video.currentTime / video.duration} 1`
      }
      frame = requestAnimationFrame(track)
    }
    const onPlay = () => {
      if (current && current !== video) current.pause()
      current = video
      setPaused(false)
      setStarted(true)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(track)
    }
    const onPause = () => {
      setPaused(true)
      cancelAnimationFrame(frame)
      if (current === video) current = null
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onPause)
    // If the browser blocks it, the video just stays paused with its play button showing.
    if (autoPlay) video.play().catch(() => {})
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onPause)
      cancelAnimationFrame(frame)
      video.pause()
    }
  }, [autoPlay])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play()
    else video.pause()
  }

  return (
    <div className="group relative size-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        playsInline
        preload={autoPlay ? 'auto' : 'none'}
        className="absolute inset-0 size-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${paused ? 'Play' : 'Pause'}: ${label}`}
        className="absolute inset-0 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white"
      >
        <span
          className={`flex size-9 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition-opacity duration-200 ${paused ? 'opacity-100' : 'opacity-0'}`}
        >
          <Play size={14} fill="currentColor" aria-hidden className="translate-x-px" />
        </span>
      </button>
      {started && (
        <>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute right-1 bottom-2 flex cursor-pointer border-0 bg-transparent p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-90 focus-visible:opacity-90"
          >
            {muted ? <VolumeX size={14} aria-hidden /> : <Volume2 size={14} aria-hidden />}
          </button>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
            <div ref={progressRef} className="h-full origin-left bg-white/85" style={{ scale: '0 1' }} />
          </div>
        </>
      )}
    </div>
  )
}
