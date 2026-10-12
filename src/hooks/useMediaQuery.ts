import { useCallback, useSyncExternalStore } from 'react'

/**
 * Lê uma media query e re-renderiza só quando ela muda de verdadeiro/falso
 * (ex.: o usuário liga "reduzir movimento"), nunca a cada evento.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (notify: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
