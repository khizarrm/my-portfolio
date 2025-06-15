# Website Redesign - Minimalistic Black & White Theme

## Overview
Complete redesign of portfolio website with:
- Jost font from Google Fonts
- Black and white minimalistic theme
- Clean typography and layout inspired by example.png
- Name, title, bio section
- Essays and Projects sections with underlined navigation
- Smaller project cards (6 per row)

## Implementation Plan

### Phase 1: Foundation Setup
- [x] **Font Integration**: Add Jost font from Google Fonts to layout.tsx
- [x] **Theme Update**: Replace current globals.css with minimalistic black/white theme
- [x] **Typography**: Set up clean typography hierarchy matching example design

### Phase 2: Homepage Redesign  
- [x] **Header Section**: 
  - Large name display (Khizar Malik)
  - "Software Developer" subtitle
  - Clean bio section
- [x] **Remove Elements**: Strip out current social media buttons and complex layouts
- [x] **Center Layout**: Implement clean centered layout with proper spacing

### Phase 3: Navigation & Sections
- [x] **Essays Section**: Add Essays section with underlined text styling
- [x] **Projects Section**: Add Projects section with underlined text styling  
- [x] **Navigation**: Implement clean navigation between sections

### Phase 4: Essays System Implementation
- [x] **Navigation Update**: Replace "Publishings", "Like", "Thoughts" with "GitHub", "LinkedIn", "X" links
- [x] **Essays List**: Create essays section with titles separated by lines
- [x] **Dynamic Routing**: Set up Next.js dynamic routing for individual essays (/essays/[slug])
- [x] **Essay Page Component**: Create individual essay page with:
  - Title at top
  - Back navigation to home
  - Long essay content (placeholder text)
- [x] **Sample Essays**: Add 4 sample essays with titles and slugs
- [x] **Styling**: Ensure essays page matches minimalistic black/white theme

### Phase 5: Project Cards Update
- [ ] **Grid Layout**: Update ProjectCard component for 6-per-row layout
- [ ] **Card Sizing**: Make project cards smaller and more compact
- [ ] **Responsive**: Ensure cards work well on different screen sizes

### Phase 6: Final Polish
- [ ] **Mobile Responsive**: Test and optimize for mobile devices
- [ ] **Typography Polish**: Fine-tune font sizes and spacing
- [ ] **Performance**: Ensure fast loading and clean code

## Design Reference
Following the clean, serif-like design from example.png with:
- Clean black background (updated)
- White text (updated)
- Generous white space
- Underlined links/navigation
- Simple, elegant typography hierarchy

## Phase 7: Line Animation System (NEW)
- [x] **CSS Keyframes**: Create smooth line growth animation (scaleX from 0 to 1)
- [x] **Center Origin**: Set transform-origin to center so lines grow from middle outward
- [x] **Staggered Timing**: Add animation delays for top-to-bottom sequential effect
- [x] **Global Application**: Apply to all `<hr>` elements across all pages:
  - Main page divider
  - Essays index page separators
  - Individual essay pages back navigation divider
- [x] **Animation Utilities**: Create CSS utility classes for different delay timings
- [x] **Performance**: Ensure smooth 60fps animation without impacting page load
- [x] **Responsive**: Test animation works well on mobile and desktop
- [x] **Accessibility**: Respect prefers-reduced-motion for users who prefer no animations

## Technical Approach
- Use `transform: scaleX()` with `transform-origin: center`
- CSS `@keyframes` for smooth growth effect
- Animation delays: 0ms, 150ms, 300ms, 450ms for staggered effect
- Duration: ~800ms for elegant, not-too-fast transition
- Easing: `ease-out` for natural deceleration

## Notes
- Focus on clean, minimalistic aesthetic
- Maintain fast loading performance
- Ensure accessibility standards
- Essays should be easily navigable and readable
- Line animations should enhance, not distract from content