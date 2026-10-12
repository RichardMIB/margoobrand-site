import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const FULL_TEXT = 'Para mulheres que se expressam através do que vestem.'

const lines: ReactNode[] = [
  'Para mulheres que',
  'se expressam através',
  <>
    do que <em className="italic text-wine">vestem.</em>
  </>,
]

const ease = [0.2, 0.8, 0.2, 1] as const

/**
 * Cada linha sobe de dentro de uma "máscara" (overflow hidden).
 * Leitor de tela ouve a frase inteira pelo aria-label; as linhas picadas
 * ficam escondidas dele.
 */
export function HeroTitle() {
  return (
    <h1
      aria-label={FULL_TEXT}
      className="m-0 font-display text-[clamp(48px,6vw,88px)] font-normal leading-none tracking-[-0.02em] max-sm:text-[42px]"
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden="true"
          // padding/margem compensam: a máscara não corta "p", "q" e o itálico
          className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
        >
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
