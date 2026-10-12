import { whatsappGeneral } from '../lib/whatsapp'
import { ButtonLink } from './Button'

const navItems = [
  { href: '#colecao', label: 'Coleção' },
  { href: '#elas-usam', label: 'Elas usam' },
  { href: '#feedbacks', label: 'Feedbacks' },
  { href: '#loja', label: 'A loja' },
] as const

export function Header() {
  return (
    <header>
      <p className="bg-ink px-4 py-2.5 text-center text-xs uppercase tracking-[0.14em] text-paper max-sm:text-[10px] max-sm:tracking-[0.1em]">
        Atendimento online e presencial · Av. Beira Mar, Mucuripe
      </p>

      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-[22px] max-sm:gap-2.5 max-sm:py-3.5">
        <a
          href="#inicio"
          aria-label="MargooBrand, voltar ao início"
          className="flex min-h-11 items-center gap-3 no-underline"
        >
          <span aria-hidden="true" className="font-display text-[34px] font-semibold leading-none tracking-[-0.02em]">
            MB
          </span>
          <span aria-hidden="true" className="text-xs font-medium tracking-[0.32em]">
            MARGOOBRAND
          </span>
        </a>

        <nav
          aria-label="Seções"
          className="flex flex-wrap gap-7 max-sm:order-3 max-sm:w-full max-sm:flex-nowrap max-sm:gap-5 max-sm:overflow-x-auto max-sm:pb-1"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap text-[13px] uppercase tracking-[0.12em] no-underline max-sm:text-[11px]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ButtonLink href={whatsappGeneral()} external variant="outline" size="sm">
          Chamar a Margoo
        </ButtonLink>
      </div>
    </header>
  )
}
