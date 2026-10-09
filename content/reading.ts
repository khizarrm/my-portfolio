import fortyRulesOfLove from '@/public/books/forty-rules-of-love.jpg'
import islandOfMissingTrees from '@/public/books/island-of-missing-trees.jpg'
import longWalkToFreedom from '@/public/books/long-walk-to-freedom.jpg'
import monkWhoSoldHisFerrari from '@/public/books/monk-who-sold-his-ferrari.jpg'
import oldManAndTheSea from '@/public/books/old-man-and-the-sea.jpg'
import piranesi from '@/public/books/piranesi.jpg'
import riveted from '@/public/books/riveted.jpg'
import type { ReadingEntry } from './types'

export const readingIntro = 'books i like. always open to recommendations!'

// Covers are from Open Library and live in /public/books.
export const reading: ReadingEntry[] = [
  { title: 'Riveted', cover: riveted, current: true },
  { title: 'The Forty Rules of Love', cover: fortyRulesOfLove },
  { title: 'The Island of Missing Trees', cover: islandOfMissingTrees },
  { title: 'The Monk Who Sold His Ferrari', cover: monkWhoSoldHisFerrari },
  { title: 'The Old Man and the Sea', cover: oldManAndTheSea },
  { title: 'Long Walk to Freedom', cover: longWalkToFreedom },
  { title: 'Piranesi', cover: piranesi },
]
