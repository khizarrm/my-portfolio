import { site } from '@/content/site'
import { PanelLink } from './PanelLink'

export function IntroText() {
  return (
    <div className="flex flex-col gap-5.5 text-lg/[1.75] desk:gap-[3.4375cqi] desk:text-[2.8125cqi]/[1.75]">
      {site.intro.map((paragraph, i) => (
        <p key={i} className="m-0 text-pretty">
          {paragraph.map((segment, j) =>
            typeof segment === 'string' ? (
              segment
            ) : 'panel' in segment ? (
              <PanelLink key={j} panel={segment.panel}>
                {segment.text}
              </PanelLink>
            ) : (
              <a
                key={j}
                href={segment.href}
                className="panel-link"
                {...(!segment.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {segment.text}
              </a>
            ),
          )}
        </p>
      ))}
    </div>
  )
}
