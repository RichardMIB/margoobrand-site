import { MotionConfig } from 'motion/react'
import { CursorRing } from './components/CursorRing'
import { Header } from './components/Header'
import { Hero } from './components/hero/Hero'
import { LivingBackground } from './components/LivingBackground'
import { ScrollProgress } from './components/ScrollProgress'
import { WhatsAppFab } from './components/WhatsAppFab'

/* Seções ainda não implementadas: só existem para as âncoras e a rolagem funcionarem. */
const upcoming = [
  { id: 'colecao', title: 'Disponíveis agora', issue: 4 },
  { id: 'elas-usam', title: 'Elas usam', issue: 5 },
  { id: 'feedbacks', title: 'O que dizem', issue: 6 },
  { id: 'loja', title: 'Venha nos visitar', issue: 6 },
] as const

export default function App() {
  return (
    // reducedMotion="user": animações de entrada viram instantâneas para quem pediu menos movimento
    <MotionConfig reducedMotion="user">
      {/* Camadas fixas: fundo atrás (z-0), conteúdo no meio (z-1), enfeites por cima. */}
      <LivingBackground />
      <ScrollProgress />
      <CursorRing />

      {/* overflow-x: clip corta a cena 3D que passa da borda sem criar barra de rolagem
          (diferente de hidden, não vira "caixa de rolagem" e não quebra o sticky da galeria) */}
      <div className="relative z-[1] overflow-x-clip">
        <Header />
        <main>
          <Hero />
          {upcoming.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="container-page flex min-h-[80vh] items-center border-t border-sand"
            >
              <h2 className="font-display text-[clamp(40px,4.5vw,64px)] font-normal leading-none text-stone">
                {s.title} <small className="font-sans text-base">— issue #{s.issue}</small>
              </h2>
            </section>
          ))}
        </main>
      </div>

      <WhatsAppFab />
    </MotionConfig>
  )
}
