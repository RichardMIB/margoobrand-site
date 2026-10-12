import { MotionConfig } from 'motion/react'
import { Header } from './components/Header'
import { Hero } from './components/hero/Hero'
import { ScrollProgress } from './components/ScrollProgress'

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
      <ScrollProgress />
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
    </MotionConfig>
  )
}
