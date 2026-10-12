import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'solid3d' | 'outline' | 'link'
type Size = 'sm' | 'md'

type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant
  size?: Size
  /** Abre em nova aba (WhatsApp, Maps). */
  external?: boolean
}

/*
 * O componente cuida da API e do HTML; os efeitos (pseudo-elementos,
 * hover, active, reduzir movimento) ficam nas classes .b3d / .bline / .ulink
 * em src/styles/index.css.
 */
const variantClass: Record<Variant, string> = {
  solid3d: 'b3d bg-ink text-paper',
  outline: 'bline border border-ink',
  link: 'ulink border-b border-ink px-2 py-4 text-[13px] text-ink',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-5 py-3 text-xs max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[11px] max-sm:tracking-[0.1em]',
  md: 'px-[30px] py-4 text-[13px]',
}

/** Todo CTA do site é navegação (âncora, WhatsApp, Maps), por isso é <a>, não <button>. */
export function ButtonLink({
  variant = 'solid3d',
  size = 'md',
  external = false,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  const sizing = variant === 'link' ? '' : sizeClass[size]
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={`inline-flex min-h-11 items-center font-medium uppercase tracking-[0.16em] no-underline ${variantClass[variant]} ${sizing} ${className}`}
    >
      {variant === 'solid3d' && <span aria-hidden="true" className="b3d-shine" />}
      {children}
    </a>
  )
}
