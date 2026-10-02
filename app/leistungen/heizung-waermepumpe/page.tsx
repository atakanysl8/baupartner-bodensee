import LeistungSeite from '../../components/LeistungSeite'
import { INHALT } from '../../inhalte/leistungsseiten/heizung-waermepumpe'

export default function Page() {
  return <LeistungSeite slug="heizung-waermepumpe" inhalt={INHALT} />
}
