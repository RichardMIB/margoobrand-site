import { useMediaQuery } from './useMediaQuery'

export type MotionPrefs = {
  /** Usuário pediu menos movimento no sistema. */
  reduceMotion: boolean
  /** Tem mouse de verdade (não é tela de toque). */
  canHover: boolean
  /** Efeitos que seguem o cursor (tilt, parallax): só com mouse e sem reduzir movimento. */
  pointerFx: boolean
}

export function useReducedMotionSafe(): MotionPrefs {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  return { reduceMotion, canHover, pointerFx: canHover && !reduceMotion }
}
