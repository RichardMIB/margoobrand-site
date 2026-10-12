import { site } from '../config/site'

/** Remove tudo que não é dígito: "+55 (85) 9..." → "5585...". */
export function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 * Enquanto o número for placeholder, gera `wa.me/?text=` (o WhatsApp pede
 * para escolher o contato) em vez de um link quebrado.
 */
export function whatsappLink(message: string, phone: string = site.whatsapp): string {
  const digits = normalizePhone(phone)
  const text = encodeURIComponent(message)
  return `https://wa.me/${digits}?text=${text}`
}

export const whatsappGeneral = () => whatsappLink(site.messages.general)
export const whatsappVisit = () => whatsappLink(site.messages.visit)
export const whatsappProduct = (productName: string) =>
  whatsappLink(site.messages.product(productName))
