import { useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useCallback, useEffect, type PointerEvent } from 'react'

type TiltOptions = {
  /** Inclinação máxima para cima/baixo, em graus. */
  maxRotateX?: number
  /** Inclinação máxima para os lados, em graus. */
  maxRotateY?: number
  enabled: boolean
}

export type Tilt = {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  /** Posição do cursor dentro do elemento, de 0 a 1 (0.5 = centro). */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  onPointerMove: (e: PointerEvent<HTMLElement>) => void
  onPointerLeave: () => void
}

const spring = { stiffness: 140, damping: 18, mass: 0.6 }

/**
 * Inclina um elemento seguindo o mouse, com mola. Tudo em MotionValues:
 * o React não re-renderiza a cada movimento.
 */
export function useTilt({ maxRotateX = 6, maxRotateY = 9, enabled }: TiltOptions): Tilt {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-maxRotateY, maxRotateY]), spring)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [maxRotateX, -maxRotateX]), spring)

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (!enabled || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      pointerX.set((e.clientX - r.left) / r.width)
      pointerY.set((e.clientY - r.top) / r.height)
    },
    [enabled, pointerX, pointerY],
  )

  const onPointerLeave = useCallback(() => {
    pointerX.set(0.5)
    pointerY.set(0.5)
  }, [pointerX, pointerY])

  // Se o efeito for desligado (ex.: ligou "reduzir movimento"), volta ao centro.
  useEffect(() => {
    if (!enabled) onPointerLeave()
  }, [enabled, onPointerLeave])

  return { rotateX, rotateY, pointerX, pointerY, onPointerMove, onPointerLeave }
}
