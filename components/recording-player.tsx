'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Segment {
  start: number
  end: number
  text: string
}

interface RecordingPlayerProps {
  title: string
  audioSrc: string
  subtitlesSrc: string
}

export default function RecordingPlayer({ title, audioSrc, subtitlesSrc }: RecordingPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [segments, setSegments] = useState<Segment[]>([])
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1)

  useEffect(() => {
    if (isExpanded && segments.length === 0) {
      fetch(subtitlesSrc)
        .then(res => res.json())
        .then(data => setSegments(data))
    }
  }, [isExpanded, subtitlesSrc, segments.length])

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const t = audio.currentTime
    setCurrentTime(t)
    const idx = segments.findIndex(s => t >= s.start && t < s.end)
    if (idx !== currentSegmentIndex) {
      setCurrentSegmentIndex(idx)
    }
  }, [segments, currentSegmentIndex])

  // Show only a window of subtitles around the current one
  const getVisibleSegments = (): { segment: Segment; idx: number }[] => {
    if (currentSegmentIndex === -1) {
      return segments.slice(0, 8).map((s, i) => ({ segment: s, idx: i }))
    }
    const start = Math.max(0, currentSegmentIndex - 2)
    const end = Math.min(segments.length, currentSegmentIndex + 6)
    return segments.slice(start, end).map((s, i) => ({ segment: s, idx: start + i }))
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const stop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
    setCurrentSegmentIndex(-1)
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(audio.currentTime)
  }

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleTitleClick = () => {
    setIsExpanded(!isExpanded)
    if (isExpanded) {
      stop()
    }
  }

  // Fixed subtitle area height — prevents layout shift
  const SUBTITLE_HEIGHT = 128

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={handleTitleClick}
          className="text-sm text-text-secondary hover:text-teal transition-colors font-medium flex-shrink-0"
        >
          {title}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 flex-1 min-w-0"
            >
              <button
                onClick={togglePlay}
                className="text-text-muted hover:text-teal transition-colors flex-shrink-0"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>
              <button
                onClick={stop}
                className="text-text-muted hover:text-teal transition-colors flex-shrink-0"
                aria-label="Stop"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="4" width="16" height="16" />
                </svg>
              </button>

              {/* Seekable progress bar */}
              <div
                className="flex-1 h-1 bg-border-default rounded-full cursor-pointer relative group"
                onClick={seek}
              >
                <div
                  className="h-full bg-teal rounded-full"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>

              <span className="text-xs text-text-muted tabular-nums flex-shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => { setIsPlaying(false); setCurrentSegmentIndex(-1) }}
      />

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? SUBTITLE_HEIGHT + 12 : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-3 pl-0.5">
          {getVisibleSegments().map(({ segment, idx }) => (
            <p
              key={idx}
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{
                color: idx === currentSegmentIndex ? '#a0f7ed' : '#6a6a6a',
                opacity: currentSegmentIndex === -1 ? 0.4 : idx === currentSegmentIndex ? 1 : idx < currentSegmentIndex ? 0.35 : 0.2,
              }}
            >
              {segment.text}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
