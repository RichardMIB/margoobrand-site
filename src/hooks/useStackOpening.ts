import { useScroll, useTransform, type MotionValue } from 'motion/react'

/** Faixa de rolagem (px) em que a pilha do hero se abre. */
const OPEN_RANGE: [number, number] = [0, 650]

type Vec3 = [x: number, y: number, z: number]

export type LayerPose = {
  /** Profundidade inicial (pilha fechada). */
  fromZ: number
  /** Deslocamento final (pilha aberta). */
  to: Vec3
}

const CLOSED_ROTATE_Y = -22
const CLOSED_ROTATE_X = 8

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function poseToTransform({ fromZ, to }: LayerPose, t: number): string {
  const ry = lerp(CLOSED_ROTATE_Y, 0, t)
  const rx = lerp(CLOSED_ROTATE_X, 0, t)
  const x = lerp(0, to[0], t)
  const y = lerp(0, to[1], t)
  const z = lerp(fromZ, to[2], t)
  return `rotateY(${ry}deg) rotateX(${rx}deg) translate3d(${x}px, ${y}px, ${z}px)`
}

/**
 * Progresso 0→1 da abertura, ligado ao scroll da JANELA (não ao hero):
 * começa a mexer no primeiro pixel rolado e termina em 650px.
 */
export function useStackProgress(): MotionValue<number> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, OPEN_RANGE, [0, 1], { clamp: true })
}

export function useLayerTransform(progress: MotionValue<number>, pose: LayerPose) {
  return useTransform(progress, (t) => poseToTransform(pose, t))
}
