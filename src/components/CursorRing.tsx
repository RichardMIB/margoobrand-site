import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

/** O anel cresce sobre links, botões e qualquer elemento marcado com data-cursor="grow". */
const GROW_SELECTOR = 'a, button, [data-cursor="grow"]'
const SIZE = 34
const GROWN_SIZE = 64

/**
 * Anel que acompanha o mouse. O cursor do sistema continua visível;
 * o anel é só enfeite. Não existe em touch nem com "reduzir movimento".
 */
export function CursorRing() {
  const { pointerFx } = useReducedMotionSafe()
  return pointerFx ? <Ring /> : null
}

function Ring() {
  const mouse = useMousePosition()
  const x = useSpring(mouse.x, { stiffness: 700, damping: 45, mass: 0.4 })
  const y = useSpring(mouse.y, { stiffness: 700, damping: 45, mass: 0.4 })
  const scale = useSpring(1, { stiffness: 320, damping: 26 })
  const opacity = useMotionValue(0)
  const fillOpacity = useTransform(scale, [1, GROWN_SIZE / SIZE], [0, 1])

  useEffect(() => {
    // Delegação: um listener no documento em vez de um por elemento.
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const target = e.target instanceof Element ? e.target : null
      scale.set(target?.closest(GROW_SELECTOR) ? GROWN_SIZE / SIZE : 1)
      opacity.set(1)
    }
    // Mouse saiu da janela: esconde o anel.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) opacity.set(0)
    }
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
    }
  }, [scale, opacity])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[17px] -mt-[17px] size-[34px] rounded-full border border-wine/55"
      style={{ x, y, scale, opacity }}
    >
      <motion.span className="absolute inset-0 rounded-full bg-wine/8" style={{ opacity: fillOpacity }} />
    </motion.div>
  )
}
