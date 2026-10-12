import { site } from './config/site'
import { whatsappGeneral } from './lib/whatsapp'

/**
 * Tela provisória da issue #1: só confere tokens, fontes e o link do
 * WhatsApp. É substituída pelas seções reais a partir da issue #2.
 */
const swatches = ['ink', 'paper', 'sand', 'wine', 'muted', 'stone', 'linen'] as const

const swatchClass: Record<(typeof swatches)[number], string> = {
  ink: 'bg-ink',
  paper: 'bg-paper',
  sand: 'bg-sand',
  wine: 'bg-wine',
  muted: 'bg-muted',
  stone: 'bg-stone',
  linen: 'bg-linen',
}

export default function App() {
  return (
    <main className="container-page py-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone">
        Nova coleção · {site.season}
      </p>
      <h1 className="mt-4 font-display text-[clamp(42px,6vw,88px)] leading-none tracking-[-0.02em]">
        Para mulheres que se expressam através do que{' '}
        <em className="text-wine">vestem.</em>
      </h1>

      <ul className="mt-12 flex flex-wrap gap-4" aria-label="Paleta de cores">
        {swatches.map((name) => (
          <li key={name} className="text-sm text-muted">
            <span
              className={`block h-16 w-24 border border-sand ${swatchClass[name]}`}
              aria-hidden="true"
            />
            {name}
          </li>
        ))}
      </ul>

      <a
        href={whatsappGeneral()}
        className="mt-12 inline-flex min-h-11 items-center border border-ink px-5 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300 ease-brand hover:bg-ink hover:text-paper"
      >
        Chamar a Margoo
      </a>
    </main>
  )
}
