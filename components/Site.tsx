import { site } from '@/content/site'
import { Hero } from './Hero'
import { IntroText } from './IntroText'
import { MainArea } from './MainArea'
import { PanelProvider } from './PanelProvider'
import { ComponentsPanel } from './panels/ComponentsPanel'
import { ContentPanel } from './panels/ContentPanel'
import { ReadingPanel } from './panels/ReadingPanel'
import { WallpapersPanel } from './panels/WallpapersPanel'
import { WorkPanel } from './panels/WorkPanel'
import { WritingPanel } from './panels/WritingPanel'
import { SidePanel } from './SidePanel'

/** The whole site: one page whose side panel state is driven by the URL. */
export function Site() {
  return (
    <PanelProvider>
      <div className="flex min-h-dvh items-stretch">
        <MainArea>
          <div className="home-header flex flex-col gap-8">
            <h1 className="m-0 -mb-3 text-[32px] font-bold tracking-[-0.01em] desk:-mb-[1.875cqi] desk:text-[5cqi]">
              {site.name}
            </h1>
            <Hero />
          </div>
          <IntroText />
        </MainArea>
        <SidePanel
          panels={{
            reading: <ReadingPanel />,
            writing: <WritingPanel />,
            content: <ContentPanel />,
            work: <WorkPanel />,
            components: <ComponentsPanel />,
            wallpapers: <WallpapersPanel />,
          }}
        />
      </div>
    </PanelProvider>
  )
}
