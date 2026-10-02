import { Fragment } from 'react'
import { anker } from '../inhalte/anker'

// Setzt Textverweise [[/pfad/]] als Links mit dem festen Ankertext aus anker.ts.
export default function TextMitLinks({ text }: { text: string }) {
  const teile = text.split(/\[\[(\/[^\]]*)\]\]/)
  return (
    <>
      {teile.map((t, i) => (i % 2 ? <a key={i} href={t}>{anker(t)}</a> : <Fragment key={i}>{t}</Fragment>))}
    </>
  )
}
