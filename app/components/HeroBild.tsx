// Hero-Bild in drei Breiten (mit fal.ai SeedVR2 hochskaliert): Handys laden 960 px, Desktop bis 2560 px.
// Ersetzt <Image fill>: der statische Export liefert mit images.unoptimized kein srcset.
export default function HeroBild({ alt }: { alt: string }) {
  return (
    <img
      src="/hero.webp"
      srcSet="/hero-960.webp 960w, /hero-1600.webp 1600w, /hero.webp 2560w"
      sizes="100vw"
      width={2560}
      height={1445}
      alt={alt}
      fetchPriority="high"
      decoding="async"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center right' }}
    />
  )
}
