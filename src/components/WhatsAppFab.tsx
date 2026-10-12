import { whatsappGeneral } from '../lib/whatsapp'

/** Botão flutuante do WhatsApp, sempre à mão. Anel pulsando vem do CSS (.fab). */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar a Margoo no WhatsApp"
      className="fab fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_8px_24px_rgb(26_23_20/0.25)] max-sm:bottom-4 max-sm:right-4"
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20.5l1.8-5.3A8.4 8.4 0 1 1 21 11.5z" />
      </svg>
    </a>
  )
}
