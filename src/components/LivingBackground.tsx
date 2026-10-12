import { motion, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useMousePosition } from '../hooks/useMousePosition'
import { useReducedMotionSafe } from '../hooks/useReducedMotionSafe'

type BlobConfig = {
  className: string
  /** Quanto o blob anda em relação ao mouse (negativo = sentido contrário). */
  factorX: number
  factorY: number
}

/* Posições, tamanhos e fatores do protótipo (.blob.b1/.b2/.b3). */
const BLOBS: BlobConfig[] = [
  { className: 'living-blob living-blob-1', factorX: 0.12, factorY: 0.1 },
  { className: 'living-blob living-blob-2', factorX: -0.1, factorY: 0.08 },
  { className: 'living-blob living-blob-3', factorX: 0.06, factorY: -0.12 },
]

/** Mola lenta: o blob "chega atrasado" onde o mouse está (~1,5s). */
const lazySpring = { stiffness: 12, damping: 8 }

const AURA_RADIUS = 560

/**
 * Camada fixa atrás de todo o conteúdo: manchas de luz, aura que segue o
 * cursor e grão. Só transform/opacity; nenhum setState no mousemove.
 */
export function LivingBackground() {
  const { pointerFx } = useReducedMotionSafe()
  const mouse = useMousePosition()

  const auraX = useTransform(mouse.x, (v) => v - AURA_RADIUS)
  const auraY = useTransform(mouse.y, (v) => v - AURA_RADIUS)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {BLOBS.map((blob) => (
        <Blob key={blob.className} {...blob} mouseX={mouse.x} mouseY={mouse.y} follow={pointerFx} />
      ))}
      <motion.div
        className="living-aura"
        // com mouse: âncora no canto (0,0) e o transform leva até o cursor
        style={pointerFx ? { left: 0, top: 0, x: auraX, y: auraY } : undefined}
      />
      <div className="living-grain" />
    </div>
  )
}

type BlobProps = BlobConfig & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  follow: boolean
}

function Blob({ className, factorX, factorY, mouseX, mouseY, follow }: BlobProps) {
  const x = useSpring(useTransform(mouseX, (v) => v * factorX), lazySpring)
  const y = useSpring(useTransform(mouseY, (v) => v * factorY), lazySpring)
  return <motion.div className={className} style={follow ? { x, y } : undefined} />
}
