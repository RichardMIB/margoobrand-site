import { motionValue, type MotionValue } from 'motion/react'
import { useEffect } from 'react'

/*
 * Posição do mouse na janela, compartilhada pela página inteira.
 * Um único listener alimenta MotionValues: quem lê (sol, fundo, anel)
 * se atualiza sem re-render do React.
 */
const hasWindow = typeof window !== 'undefined'
const mouseX = motionValue(hasWindow ? window.innerWidth / 2 : 0)
const mouseY = motionValue(hasWindow ? window.innerHeight / 2 : 0)

let listeners = 0

function onPointerMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  mouseX.set(e.clientX)
  mouseY.set(e.clientY)
}

export function useMousePosition(): { x: MotionValue<number>; y: MotionValue<number> } {
  useEffect(() => {
    if (listeners++ === 0) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }
    return () => {
      if (--listeners === 0) window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return { x: mouseX, y: mouseY }
}
