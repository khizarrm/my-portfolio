import portrait from '@/public/images/me.jpg'
import portraitCampus from '@/public/images/me-campus.jpg'
import portraitDinner from '@/public/images/me-dinner.jpg'
import portraitFriends from '@/public/images/me-friends.jpg'
import portraitMugshot from '@/public/images/me-mugshot.jpg'
import portraitNight from '@/public/images/me-night.jpg'
import portraitSelfie from '@/public/images/me-selfie.jpg'
import portraitWall from '@/public/images/me-wall.jpg'
import { paintings } from '@/content/paintings'
import { HeroCarousel, type Portrait } from './HeroCarousel'
import { SocialIcons } from './SocialIcons'

const portraits: Portrait[] = [
  { src: portrait, alt: 'Photo of Khizar Malik' },
  { src: portraitNight, alt: 'Photo of Khizar Malik outside at dusk' },
  { src: portraitCampus, alt: 'Photo of Khizar Malik and a friend sitting on a ledge on campus' },
  { src: portraitFriends, alt: 'Photo of Khizar Malik with two friends in front of a brick building' },
  { src: portraitSelfie, alt: 'Selfie of Khizar Malik with a friend' },
  { src: portraitMugshot, alt: 'Photo of Khizar Malik and a friend in costume at a mugshot photo booth' },
  { src: portraitDinner, alt: 'Photo of Khizar Malik and a friend at dinner' },
  { src: portraitWall, alt: 'Photo of Khizar Malik and a friend sitting on a brick wall', scale: 1.5 },
]

export function Hero() {
  // Layout and paint containment: the hero's contents can't affect the rest of the page, so a resize
  // during the side panel animation stays cheap.
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl [contain:layout_paint] desk:rounded-[1.875cqi]">
      <HeroCarousel paintings={paintings} portraits={portraits} />
      <SocialIcons />
    </div>
  )
}
