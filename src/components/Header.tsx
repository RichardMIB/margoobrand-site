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

      {/*
        Celular: grade de 2 linhas → [logo | botão] em cima, nav rolável embaixo.
        A partir de 640px: uma linha só (logo · nav · botão).
      */}
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2.5 py-3.5 sm:flex sm:flex-wrap sm:justify-between sm:gap-4 sm:py-[22px]">
        <a
          href="#inicio"
          aria-label="MargooBrand, voltar ao início"
          className="flex min-h-11 min-w-0 items-center gap-2 no-underline sm:gap-3"
        >
          <span aria-hidden="true" className="font-display text-[28px] font-semibold leading-none tracking-[-0.02em] sm:text-[34px]">
            MB
          </span>
          <span aria-hidden="true" className="truncate text-[10px] font-medium tracking-[0.2em] sm:text-xs sm:tracking-[0.32em]">
            MARGOOBRAND
          </span>
        </a>

        <nav
          aria-label="Seções"
          className="col-span-2 row-start-2 flex gap-5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-7 sm:overflow-visible sm:pb-0"
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
