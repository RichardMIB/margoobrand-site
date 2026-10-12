import { motion } from 'motion/react'
import { site } from '../../config/site'
import { useReducedMotionSafe } from '../../hooks/useReducedMotionSafe'
import { useTilt } from '../../hooks/useTilt'
import { ButtonLink } from '../Button'
import { HeroScene } from './HeroScene'
import { HeroTitle } from './HeroTitle'

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
}

export function Hero() {
  const prefs = useReducedMotionSafe()
  const tilt = useTilt({ maxRotateX: 6, maxRotateY: 9, enabled: prefs.pointerFx })

  return (
    <section
      id="inicio"
      aria-label="Início"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="container-page flex flex-wrap items-center gap-14 pb-[120px] pt-6 max-sm:gap-7 max-sm:pb-[72px] max-sm:pt-2"
    >
      <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-7">
        <motion.p
          {...fadeIn}
          className="m-0 text-xs font-medium uppercase tracking-[0.3em] text-wine"
        >
          Nova coleção · {site.season}
        </motion.p>

        <HeroTitle />

        <motion.p {...fadeIn} className="m-0 max-w-[440px] text-lg leading-[1.6] text-muted">
          Peças escolhidas a dedo, do alfaiataria ao tricot. Veja o que está disponível e
          reserve a sua direto pelo WhatsApp.
        </motion.p>

        <motion.div
          {...fadeIn}
          className="flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch max-sm:[&>a]:justify-center"
        >
          <ButtonLink href="#colecao">Escolher meu look</ButtonLink>
          <ButtonLink href="#loja" variant="link">
            Conhecer a loja
          </ButtonLink>
        </motion.div>
      </div>

      <HeroScene tilt={tilt} prefs={prefs} />
    </section>
  )
}
