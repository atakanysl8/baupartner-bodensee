import LeistungSeite from '../../components/LeistungSeite'
import { INHALT } from '../../inhalte/leistungsseiten/garten-aussenanlagen'

export default function Page() {
  return <LeistungSeite slug="garten-aussenanlagen" inhalt={INHALT} />
}
