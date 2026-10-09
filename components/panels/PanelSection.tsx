import type { ReactNode } from 'react'

/** Shared panel wrapper. The heading takes focus when its panel opens. */
export function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4.5 text-[17px]/[1.7] desk:text-[16px]/[1.7]">
      <h2 data-panel-heading tabIndex={-1} className="m-0 text-[26px] font-bold">
        {title}
      </h2>
      {children}
    </section>
  )
}

/** Monospace label shown in empty media frames and logo slots. */
export function PlaceholderLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono opacity-80 ${className ?? ''}`}>{children}</span>
}
