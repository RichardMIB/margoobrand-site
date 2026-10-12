/**
 * Único lugar com os dados da loja. Para trocar número, preço, horário ou
 * depoimento, mexa só aqui. Valores entre colchetes ([...]) são pendências
 * do cliente e estão listados no README.
 */

export type ImageAsset = {
  src: string
  width: number
  height: number
  alt: string
}

export type Product = {
  id: string
  name: string
  detail: string
  /** `null` mostra "Consulte" no card. */
  price: string | null
  image: ImageAsset
  imagePosition: string
}

export type Look = {
  label: string
  image: ImageAsset
  imagePosition: string
}

export type Testimonial = {
  quote: string
  author: string
}

export const images = {
  fachada: {
    src: '/images/01-fachada.jpg',
    width: 730,
    height: 1040,
    alt: 'Fachada da loja MargooBrand na Galeria Via Scala, Av. Beira Mar',
  },
  bodyCanelado: {
    src: '/images/02-body-canelado.jpg',
    width: 1080,
    height: 800,
    alt: 'Body de tricot canelado da MargooBrand',
  },
  alfaiataria: {
    src: '/images/03-alfaiataria.jpg',
    width: 880,
    height: 1100,
    alt: 'Cliente usando conjunto de alfaiataria off white',
  },
  offwhiteBordado: {
    src: '/images/04-offwhite-bordado.jpg',
    width: 1100,
    height: 992,
    alt: 'Conjunto off white com renda e bordado',
  },
  plissado: {
    src: '/images/05-plissado.jpg',
    width: 880,
    height: 1100,
    alt: 'Vestido longo plissado',
  },
  lookDetalhes: {
    src: '/images/06-look-detalhes.jpg',
    width: 880,
    height: 1100,
    alt: 'Look prata com detalhes em renda',
  },
  lookNoite: {
    src: '/images/07-look-noite.jpg',
    width: 463,
    height: 1100,
    alt: 'Look de festa com brilho',
  },
  alfaiatariaClean: {
    src: '/images/08-alfaiataria-clean.jpg',
    width: 880,
    height: 1100,
    alt: 'Blazer cropped com calça pantalona de alfaiataria',
  },
  momentos: {
    src: '/images/09-momentos.jpg',
    width: 498,
    height: 1100,
    alt: 'Arara de roupas dentro da loja MargooBrand',
  },
  heroPoster: {
    src: '/images/hero-poster.jpg',
    width: 540,
    height: 960,
    alt: 'Peças da nova coleção MargooBrand',
  },
} as const satisfies Record<string, ImageAsset>

export const site = {
  name: 'MargooBrand',
  /** Só dígitos, com DDI + DDD (ex.: 5585999999999). */
  whatsapp: '[NUMERO]',
  instagram: 'margoobrand_',
  address: {
    street: 'Av. Beira Mar, 3960 · Loja 16',
    place: 'Galeria Via Scala',
    district: 'Mucuripe, Fortaleza – CE',
    mapsUrl: 'https://maps.google.com/?q=Av.+Beira+Mar+3960+Fortaleza',
  },
  hours: {
    weekdays: 'Seg a Sex 9h às 19h',
    saturday: 'Sábado [CONFIRMAR]',
  },
  season: 'Primavera 2026',
  hero: {
    video: '/video/hero.mp4',
    poster: images.heroPoster,
  },

  /** Mensagens que já chegam escritas no WhatsApp. */
  messages: {
    general: 'Oi! Vim pelo site da MargooBrand e quero atendimento.',
    visit: 'Oi! Vim pelo site e quero marcar uma visita na loja.',
    product: (productName: string) =>
      `Oi! Vi no site e quero separar: ${productName}. Qual o tamanho disponível?`,
  },

  /** Pendente de confirmação com o cliente (entrega e parcelamento). */
  marquee: [
    'Reserva pelo WhatsApp',
    'Retire na loja ou receba em casa',
    'Parcelamento facilitado',
    'Atendimento personalizado',
  ],

  products: [
    {
      id: 'body-tricot-mury',
      name: 'Body Tricot Mury',
      detail: '3 cores · verde pine, cabernet, off white',
      price: null,
      image: images.bodyCanelado,
      imagePosition: '50% 30%',
    },
    {
      id: 'vestido-longo-plissado',
      name: 'Vestido Longo Plissado',
      detail: 'Disponível em bege e rosa',
      price: null,
      image: images.plissado,
      imagePosition: '45% 35%',
    },
    {
      id: 'conjunto-off-white-bordado',
      name: 'Conjunto Off White Bordado',
      detail: 'Renda e bordado em cada detalhe',
      price: null,
      image: images.offwhiteBordado,
      imagePosition: '50% 40%',
    },
    {
      id: 'alfaiataria-clean',
      name: 'Alfaiataria Clean',
      detail: 'Blazer cropped + calça pantalona',
      price: null,
      image: images.alfaiatariaClean,
      imagePosition: '50% 35%',
    },
  ] satisfies Product[],

  /** Ordem da galeria definida na SPEC: 06, 07, 03, 09, 08, 04, 02. */
  looks: [
    { label: 'Look prata com renda', image: images.lookDetalhes, imagePosition: 'center' },
    { label: 'Brilho de festa', image: images.lookNoite, imagePosition: '50% 40%' },
    { label: 'Alfaiataria off white', image: images.alfaiataria, imagePosition: '72% 40%' },
    { label: 'Arara da loja', image: images.momentos, imagePosition: 'center' },
    { label: 'Alfaiataria clean', image: images.alfaiatariaClean, imagePosition: '50% 35%' },
    { label: 'Off white bordado', image: images.offwhiteBordado, imagePosition: '50% 40%' },
    { label: 'Body tricot', image: images.bodyCanelado, imagePosition: '50% 30%' },
  ] satisfies Look[],

  testimonials: [
    { quote: '[DEPOIMENTO]', author: '[NOME]' },
    { quote: '[DEPOIMENTO]', author: '[NOME]' },
    { quote: '[DEPOIMENTO]', author: '[NOME]' },
  ] satisfies Testimonial[],
} as const
