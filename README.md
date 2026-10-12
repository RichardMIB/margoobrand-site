# MargooBrand — landing page

Landing page da **MargooBrand**, loja de moda feminina na Av. Beira Mar (Fortaleza-CE).
Sem backend: todos os CTAs abrem o WhatsApp com a mensagem já escrita.

Feito por **DataCode Studio**.

## Stack

- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 (tokens em `@theme`, arquivo `src/styles/index.css`)
- Motion (`motion/react`) para rolagem, cursor e presença; 3D só com CSS
- Deploy na Vercel

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b + build de produção em dist/
npm run typecheck  # checagem de tipos
npm run lint       # oxlint
```

## Onde mexer

| O quê | Arquivo |
|---|---|
| Número, endereço, horário, produtos, galeria, depoimentos, marquee | `src/config/site.ts` |
| Links do WhatsApp | `src/lib/whatsapp.ts` |
| Cores, fontes, easing, container | `src/styles/index.css` |
| Especificação e protótipo aprovado | `docs/SPEC.md`, `docs/prototipo/` |

## Pendências do cliente

Tudo abaixo está como placeholder em `src/config/site.ts` (issue #9). Não bloqueia o deploy.

- [ ] **Número do WhatsApp** (`whatsapp: '[NUMERO]'`). Até chegar, os links abrem o WhatsApp sem contato definido.
- [ ] **Preços** das peças (`price: null` mostra "Consulte").
- [ ] **Horário de sábado** (`hours.saturday: 'Sábado [CONFIRMAR]'`).
- [ ] **Marquee**: confirmar "Retire na loja ou receba em casa" e "Parcelamento facilitado".
- [ ] **Depoimentos reais** (`testimonials`: `[DEPOIMENTO]` e `[NOME]`).
- [ ] **Mensagens do WhatsApp** do header e da visita (`messages.general` e `messages.visit`) — sugestão nossa, validar com o cliente.
- [ ] **Fotos originais** sem texto sobreposto.
- [ ] **Autorização** para usar o site como case no portfólio.
