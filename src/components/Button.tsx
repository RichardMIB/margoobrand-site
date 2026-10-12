import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'solid' | 'outline' | 'link'
type Size = 'sm' | 'md'

type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & {
  variant?: Variant
  size?: Size
  /** Abre em nova aba (WhatsApp, Maps). */
  external?: boolean
}

/*
 * As classes b3d / bline / ulink são os ganchos dos efeitos de hover
 * (issue #3). Aqui fica só a aparência base.
 */
const variantClass: Record<Variant, string> = {
  solid: 'b3d bg-ink text-paper shadow-[0_4px_0_var(--color-wine),0_10px_20px_rgb(26_23_20/0.15)]',
  outline: 'bline border border-ink text-ink',
  link: 'ulink border-b border-ink px-2 py-4 text-[13px] text-ink',
}

const sizeClass: Record<Size, string> = {
  sm: 'px-5 py-3 text-xs max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[11px]',
  md: 'px-[30px] py-4 text-[13px]',
}

export function ButtonLink({
  variant = 'solid',
  size = 'md',
  external = false,
  className = '',
  ...rest
}: ButtonLinkProps) {
  const sizing = variant === 'link' ? '' : sizeClass[size]
  return (
    <a
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
      className={`inline-flex min-h-11 items-center font-medium uppercase tracking-[0.16em] no-underline ${variantClass[variant]} ${sizing} ${className}`}
    />
  )
}
