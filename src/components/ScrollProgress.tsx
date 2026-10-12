import { motion, useScroll } from 'motion/react'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

/** Barra vinho de 3px no topo que enche conforme a página é rolada. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const { reduceMotion } = useReducedMotionSafe()

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-wine"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
