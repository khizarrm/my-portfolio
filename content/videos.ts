import type { VideoSection } from './types'

// Files live in /public/videos. Re-encode new uploads to H.264 with faststart so they
// play in every browser (see README). Section titles are a single line shown above their videos.
export const videoSections: VideoSection[] = [
  {
    title:
      'i recently made a stop motion ad for bramble, an insurance startup. created using higgsfield, midjourney, and figma. this is how i did it.',
    videos: [
      {
        ratio: '16:9',
        description: 'Stop motion ad for Bramble, an insurance startup.',
        src: '/videos/video-7.mp4',
        preview: '/videos/video-7-preview.mp4',
        poster: '/videos/video-7.jpg',
      },
    ],
  },
  {
    title: "i do regular updates on [x](https://x.com/khizar_mm), here's one of them.",
    videos: [
      {
        ratio: '16:9',
        description: 'An update video I posted on X.',
        src: '/videos/video-8.mp4',
        preview: '/videos/video-8-preview.mp4',
        poster: '/videos/video-8.jpg',
      },
    ],
  },
  {
    title: 'ugc stuff i did for my app [sema](https://try-sema.com). generated 30k+ views.',
    videos: [
      {
        ratio: '9:16',
        description: 'The easiest way to get an internship in 2026.',
        src: '/videos/video-1.mp4',
        preview: '/videos/video-1-preview.mp4',
        poster: '/videos/video-1.jpg',
      },
      {
        ratio: '9:16',
        description: 'Day 1 of getting an internship through cold emailing.',
        src: '/videos/video-4.mp4',
        preview: '/videos/video-4-preview.mp4',
        poster: '/videos/video-4.jpg',
      },
      {
        ratio: '9:16',
        description: 'Day 2 of trying to get an internship through cold emailing.',
        src: '/videos/video-2.mp4',
        preview: '/videos/video-2-preview.mp4',
        poster: '/videos/video-2.jpg',
      },
      {
        ratio: '9:16',
        description: 'Building a career in 30 days with my own cold emailing app.',
        src: '/videos/video-3.mp4',
        preview: '/videos/video-3-preview.mp4',
        poster: '/videos/video-3.jpg',
      },
      {
        ratio: '9:16',
        description: 'Finding clients when I started my business.',
        src: '/videos/video-5.mp4',
        preview: '/videos/video-5-preview.mp4',
        poster: '/videos/video-5.jpg',
      },
      {
        ratio: '9:16',
        description: 'The outreach tool a business owner showed me.',
        src: '/videos/video-6.mp4',
        preview: '/videos/video-6-preview.mp4',
        poster: '/videos/video-6.jpg',
      },
    ],
  },
]
