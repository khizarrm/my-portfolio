import type { ComponentProps, ReactNode } from 'react'

/** "Title - one-sentence note" row shared by Reading and Writings. The note is optional. */
export function ListRowContent({ title, note }: { title: ReactNode; note?: ReactNode }) {
  return (
    <>
      <span className="font-medium">{title}</span>
      {note && (
        <>
          <span aria-hidden className="opacity-50">
            -
          </span>
          <span className="opacity-60">{note}</span>
        </>
      )}
    </>
  )
}

export const listRowClass =
  'flex flex-wrap items-baseline gap-1.5 border-b border-rule py-3.5 text-base text-inherit no-underline'

export function ListRowLink({ className, ...props }: ComponentProps<'a'>) {
  return <a {...props} className={`${listRowClass} list-row-link ${className ?? ''}`} />
}
