# SPEC — Landing page MargooBrand (DataCode Studio)

Landing page **real** da loja de moda feminina **MargooBrand** (Fortaleza-CE). Também vira case de portfólio do Richard no 99Freelas. Direção visual **A — Elegante** já aprovada em protótipo (`prototipo/Main.dc.html`, formato de canvas de design: use como referência visual e de comportamento, **não** copie o formato).

## Stack (decidida)
- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 (tokens via `@theme`)
- **Motion** (`motion/react`) para animações de rolagem, cursor e presença. 3D só com CSS (`perspective`, `rotateX/Y`, `translateZ`). **Sem Three.js.**
- Deploy: Vercel. Sem backend: todos os CTAs abrem WhatsApp.
- Fontes Google: **Cormorant Garamond** (títulos, 400/500/600 + itálico) e **Jost** (texto/UI, 300/400/500).

## Tokens de design
| Token | Valor | Uso |
|---|---|---|
| `ink` | `#1A1714` | texto, botões escuros, seções escuras |
| `paper` | `#F6F2EC` | fundo geral |
| `sand` | `#D9CBB6` | linhas, detalhes |
| `wine` | `#6E1F2B` | destaque (accent), base 3D dos botões, barra de progresso |
| `muted` | `#4A433C` | texto secundário |
| `stone` | `#6B625A` | legendas |
| `linen` | `#E9E0D3` | fundo da seção loja (usar com ~55% de opacidade) |
| blobs do fundo | `#EAD3BC`, `#F1D1D6`, `#E9DCCB` | manchas de luz |

Easing padrão: `cubic-bezier(.2,.8,.2,1)`. Container máx 1240px, gutter 24px (16px no celular).

## Dados configuráveis (um arquivo só: `src/config/site.ts`)
- `whatsapp`: `[NUMERO]` → placeholder até o pai enviar. Gerar links `https://wa.me/<numero>?text=<mensagem encodeURIComponent>`.
- `instagram`: `margoobrand_`
- `address`: Av. Beira Mar, 3960 · Loja 16 · Galeria Via Scala · Mucuripe, Fortaleza – CE
- `hours`: Seg a Sex 9h às 19h · Sábado `[CONFIRMAR]`
- `season`: "Primavera 2026"
- `products[]`: `{ id, name, detail, price: string | null, image, imagePosition }` — preço `null` mostra "Consulte".
- `looks[]` (galeria): `{ label, image, imagePosition }`

## Assets (já otimizados, em `public/`)
O protótipo referencia as imagens por URLs internas (`/_blob/...`); use esta tabela no lugar delas.
| Arquivo | Onde | `object-position` |
|---|---|---|
| `video/hero.mp4` + `images/hero-poster.jpg` | vídeo do hero (22s, mudo, 540px, loop) | center |
| `images/02-body-canelado.jpg` | hero camada de trás + produto "Body Tricot Mury" (3 cores · verde pine, cabernet, off white) + galeria "Body tricot" | 50% 30% |
| `images/05-plissado.jpg` | hero camada da frente + produto "Vestido Longo Plissado" (Disponível em bege e rosa) | 45% 35% |
| `images/04-offwhite-bordado.jpg` | produto "Conjunto Off White Bordado" (Renda e bordado em cada detalhe) + galeria | 50% 40% |
| `images/08-alfaiataria-clean.jpg` | produto "Alfaiataria Clean" (Blazer cropped + calça pantalona) + galeria | 50% 35% |
| `images/06-look-detalhes.jpg` | galeria "Look prata com renda" | center |
| `images/07-look-noite.jpg` | galeria "Brilho de festa" | 50% 40% |
| `images/03-alfaiataria.jpg` | galeria "Alfaiataria off white" | 72% 40% |
| `images/09-momentos.jpg` | galeria "Arara da loja" | center |
| `images/01-fachada.jpg` | seção Loja (foto inteira + fundo desfocado) | center |
Ordem da galeria: 06, 07, 03, 09, 08, 04, 02. Converter para WebP no build é bem-vindo (opcional).

## Textos (voz da marca — usar exatamente)
- Barra topo: "Atendimento online e presencial · Av. Beira Mar, Mucuripe"
- Botão header: **Chamar a Margoo**
- Hero: eyebrow "Nova coleção · {season}"; H1 "Para mulheres que se expressam através do que *vestem.*" (itálico vinho em "vestem."); texto "Peças escolhidas a dedo, do alfaiataria ao tricot. Veja o que está disponível e reserve a sua direto pelo WhatsApp."; botões **Escolher meu look** (→ #colecao) e **Conhecer a loja** (→ #loja)
- Marquee: Reserva pelo WhatsApp ✦ Retire na loja ou receba em casa ✦ Parcelamento facilitado ✦ Atendimento personalizado ✦ (**pendente de confirmação com o cliente** — deixar no config)
- Coleção: "Disponíveis agora" + "Toque em uma peça e a mensagem chega pronta no WhatsApp, com o nome e o tamanho." Botão do card: **Separa essa pra mim** (mensagem: "Oi! Vi no site e quero separar: {produto}. Qual o tamanho disponível?")
- Galeria: "Elas *usam*" + link "@margoobrand_ no Instagram"; dica desktop "Role para ver os looks · passe o cursor nas fotos", celular "Continue rolando para ver os looks"; legenda do card "{nn} · MargooBrand / {label} / Separa essa pra mim →"
- Depoimentos: "O que dizem" — 3 cards com `[DEPOIMENTO]` e `[NOME]` (placeholders, vêm do cliente)
- Loja: "Venha nos visitar" / "Nossa casa nova na Beira Mar" / endereço / horário; botões **Me leva até a loja** (Google Maps) e **Marcar minha visita** (WhatsApp)
- Rodapé: "MargooBrand" · "Instagram @margoobrand_ · WhatsApp" · "Site por DataCode Studio"

## Seções e comportamento
1. **Barra de progresso** (fixa, topo, 3px vinho) — `useScroll()` + `scaleX`.
2. **Topo + header** — logo "MB MARGOOBRAND", nav (Coleção, Elas usam, Feedbacks, A loja), botão contorno. Celular: nav vira faixa rolável horizontal abaixo da logo.
3. **Hero**
   - Esquerda: textos; H1 revela **linha por linha** com máscara (overflow hidden + y 105%→0, stagger 120ms).
   - Direita: **cena 3D** (`perspective: 1400px`):
     - **Vídeo** principal (`public/video/hero.mp4`, poster `hero-poster.jpg`) em moldura inclinada `rotateY(-22deg) rotateX(8deg) translateZ(40px)`, `autoplay muted loop playsInline`, botão **pausar/tocar** (44px, aria-label dinâmico). Respeitar reduzir movimento: começar pausado.
     - 2 fotos atrás em profundidade (body tricot, vestido plissado), flutuando (y ±14px, 7–9s).
     - "Sol" (círculo radial bege) atrás, movendo **contra** o cursor (parallax 6%).
     - **Órbita** 3D (elipse 1px vinho, `rotateX(74deg)`, girando 26s) com ponto vinho.
     - **Cursor**: o grupo inclina seguindo o mouse (rotateY ±9°, rotateX ±6°, mola suave) + brilho radial no ponto do mouse sobre o vídeo (`mix-blend-mode: soft-light`).
     - **Rolagem**: nos primeiros ~650px de scroll a pilha "abre" (cada camada endireita e se separa em Z). Deve começar no **primeiro** movimento de scroll.
   - Celular: cena 3D vem **antes** do texto (order -1), altura ~420px; H1 42px; botões largura total.
4. **Marquee** de diferenciais em Cormorant itálico 30px (22px no celular), loop 28s, conteúdo duplicado com `aria-hidden` na cópia.
5. **Disponíveis agora** — grid auto-fit min 240px. Card: foto 380px (440px no celular), nome em Cormorant, preço, detalhe, botão. Entrada na rolagem com leve rotação 3D (rotateX 18°→0, y 80→0). **Cursor**: card inclina seguindo o mouse (±9°/±7°, translateZ 30px) + brilho + zoom 1.08 na foto. Fotos coloridas sempre.
6. **Elas usam** (fundo `ink`) — **galeria horizontal guiada pela rolagem**: seção alta (~3000px), conteúdo `sticky` com altura `min(100svh, 780px)`; trilho desliza de 0 até `-(larguraTrilho - viewport)`.
   - **Pausa inicial**: de 0% a 18% do progresso o trilho fica parado e aparece a dica (ícone de mouse animado + seta "→"); a dica some entre 14% e 22%. Trilho termina em 88%.
   - Cards com proporção 340:460, altura `min(430px, 100svh - 230px)`, alturas alternadas (pares com margin-top 56px).
   - **Cursor**: fotos começam levemente P&B/escurecidas; no hover ganham cor, zoom 1.08, inclinam seguindo o mouse com brilho, e a legenda sobe de baixo. Em `(hover: none)` a legenda fica visível e as fotos coloridas.
   - Reduzir movimento: vira rolagem horizontal normal (`overflow-x: auto`), sem pin.
7. **O que dizem** — 3 cards brancos, entrada com fade/translate.
8. **Loja** — foto **inteira** (`object-fit: contain`) sobre a **mesma foto desfocada** (blur 26px, scale 1.2) preenchendo a moldura; altura `clamp(480px, 72vh, 720px)`; revelação em cortina (clip-path de cima para baixo). Texto ao lado.
9. **Rodapé** escuro.
10. **Botão flutuante WhatsApp** (56px, anel pulsando, hover sobe/cresce, aria-label "Chamar a Margoo no WhatsApp").

### Fundo vivo (página inteira)
Camada `fixed` atrás de tudo, `pointer-events: none`: 3 blobs desfocados (blur 70px, opacidade .55) que respiram (scale 1→1.2) e seguem o cursor com atraso (fatores .12/-.10/.06), luz radial 560px seguindo o cursor, textura de grão (SVG feTurbulence, opacidade .07). **Atualizar via CSS variables / MotionValues — nunca setState a cada mousemove.**
Anel do cursor (34px, borda vinho) que cresce para 64px sobre links/botões/cards; escondido em `(hover: none)`.

### Botões
- **Escuro (`b3d`)**: base vinho embaixo (`box-shadow: 0 4px 0 wine`), hover `perspective(600px) rotateX(14deg) translateY(-4px)` + brilho que atravessa; active afunda.
- **Contorno (`bline`)**: preenchimento preto sobe de baixo (scaleY), texto vira paper, sobe 3px.
- **Link (`ulink`)**: sublinhado cresce.
- `:focus-visible` com outline vinho 2px.

## Acessibilidade e performance (obrigatório)
- `prefers-reduced-motion`: sem parallax/tilt/pin/marquee; tudo visível e estático; vídeo pausado.
- Touch targets ≥ 44px; contraste 4.5:1; HTML semântico (header/nav/main/section/footer, `address`, `figure/blockquote`).
- Imagens: `loading="lazy"` abaixo da dobra, `width/height` definidos, alt descritivo. Vídeo com `preload="metadata"` e poster.
- Listeners de mouse/scroll passivos e limpos no unmount; animar só `transform`/`opacity`/`clip-path`.
- SEO: `<title>`, meta description, Open Graph com `og-image` (usar `hero-poster.jpg`), `lang="pt-BR"`, favicon "MB".
- Meta Lighthouse mobile ≥ 85 em Performance e ≥ 95 em Acessibilidade.

## Estrutura de pastas sugerida
```
src/
  config/site.ts
  components/ (Header, Hero, HeroScene, Marquee, ProductCard, Collection, LooksGallery, Testimonials, Store, Footer, WhatsAppFab, LivingBackground, CursorRing, ScrollProgress, Button)
  hooks/ (useMousePosition, useTilt, useReducedMotionSafe)
  lib/whatsapp.ts
  styles/index.css (Tailwind + @theme tokens)
public/images, public/video
```

## Critérios de pronto (Definition of Done)
- [ ] Todas as seções acima, fiéis ao protótipo A, em 360px, 768px e 1280px+
- [ ] Todos os CTAs geram link do WhatsApp correto a partir do config
- [ ] Reduzir movimento testado (DevTools → Rendering → Emulate prefers-reduced-motion)
- [ ] `npm run build` sem erros, `tsc` sem erros, lint limpo
- [ ] Deploy na Vercel com URL pública
- [ ] Nenhum placeholder `[...]` no ar sem estar listado no README como pendência do cliente
