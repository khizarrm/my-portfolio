import Link from 'next/link'
import { Play } from 'lucide-react'

export default function UGC() {
  // Placeholders for now — swap `src` in for each when the real videos are ready.
  const videos = [
    { id: 1, title: 'video 1', src: '/ugc/video-1.mp4' },
    { id: 2, title: 'video 2', src: '/ugc/video-2.mp4' },
    { id: 3, title: 'video 3', src: '/ugc/video-3.mp4' },
    { id: 4, title: 'video 4', src: '/ugc/video-4.mp4' },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-3xl px-8 py-6">
        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-text-secondary hover:text-teal transition-colors inline-block mb-6"
        >
          ← back
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-medium mb-2">ugc</h1>
          <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
            i do research, hooks, scripting and the rest, to take a lot off your
            plate. i&apos;m a founder too who&apos;s hired UGC creators before, so i get
            how it works.
          </p>
          <a
            href="https://www.youtube.com/@khizar-u9k"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-teal transition-colors inline-block mt-3"
          >
            youtube ↗
          </a>
        </header>

        {/* Video Grid */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="space-y-2">
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
                  {video.src ? (
                    <video
                      src={video.src}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-muted">
                      <Play className="w-8 h-8" />
                      <span className="text-xs">coming soon</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-text-muted">{video.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
