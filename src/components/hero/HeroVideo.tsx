import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site'

type HeroVideoProps = {
  /** Com "reduzir movimento" o vídeo começa pausado. */
  startPaused: boolean
  /** Moldura que flutua; o botão fica fora dela para não balançar. */
  frameClassName: string
}

/**
 * Vídeo mudo em loop com botão de pausar/tocar.
 * - "Pausado pelo usuário" vive num ref, separado do estado real do vídeo
 *   (`playing`, que só espelha os eventos play/pause).
 * - Tenta tocar em todo momento em que faz sentido: no mount, quando o vídeo
 *   fica pronto (loadeddata/canplay) e quando volta a ficar visível.
 * - `muted` é forçado por ref: o React nem sempre aplica o atributo, e sem
 *   ele o navegador bloqueia o autoplay.
 */
export function HeroVideo({ startPaused, frameClassName }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pausedByUser = useRef(startPaused)
  const visible = useRef(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    el.muted = true
    el.defaultMuted = true
    pausedByUser.current = startPaused
    if (startPaused) el.pause()

    const tryPlay = () => {
      if (pausedByUser.current || !visible.current || !el.paused) return
      el.play().catch(() => {
        // Autoplay bloqueado (ex.: modo economia): fica no poster e o botão mostra "Tocar".
      })
    }

    // Fora da tela só pausa; não mexe em `pausedByUser`.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      visible.current = entry.isIntersecting
      if (entry.isIntersecting) tryPlay()
      else if (!el.paused) el.pause()
    })
    observer.observe(el)

    el.addEventListener('loadeddata', tryPlay)
    el.addEventListener('canplay', tryPlay)
    tryPlay()

    return () => {
      observer.disconnect()
      el.removeEventListener('loadeddata', tryPlay)
      el.removeEventListener('canplay', tryPlay)
    }
  }, [startPaused])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      pausedByUser.current = false
      el.muted = true
      el.play().catch(() => {})
    } else {
      pausedByUser.current = true
      el.pause()
    }
  }

  const { video, poster } = site.hero

  return (
    <>
      <div className={frameClassName}>
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={video}
          poster={poster.src}
          width={poster.width}
          height={poster.height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vídeo com looks da coleção MargooBrand"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar vídeo' : 'Tocar vídeo'}
        className="absolute right-3 top-3 z-[4] flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-ink/45 text-white backdrop-blur-md focus-visible:outline-paper"
      >
        {playing ? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 5v14M15 5v14" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M7 4l13 8-13 8z" />
          </svg>
        )}
      </button>
    </>
  )
}
