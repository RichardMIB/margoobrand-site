import { motion, useSpring, useTransform } from 'motion/react'
import { images } from '../../config/site'
import { useMousePosition } from '../../hooks/useMousePosition'
import type { MotionPrefs } from '../../hooks/useReducedMotionSafe'
import {
  poseToTransform,
  useLayerTransform,
  useStackProgress,
  type LayerPose,
} from '../../hooks/useStackOpening'
import type { Tilt } from '../../hooks/useTilt'
import { HeroVideo } from './HeroVideo'

/* Poses da pilha: fechada (início) → aberta (após 650px de rolagem). */
const POSE_VIDEO: LayerPose = { fromZ: 40, to: [-40, -60, 60] }
const POSE_BACK: LayerPose = { fromZ: -120, to: [60, -120, 140] }
const POSE_FRONT: LayerPose = { fromZ: -60, to: [30, 40, 100] }

const SUN_PARALLAX = -0.06
const sunSpring = { stiffness: 40, damping: 18 }

type HeroSceneProps = {
  tilt: Tilt
  prefs: MotionPrefs
}

export function HeroScene({ tilt, prefs }: HeroSceneProps) {
  const { pointerFx, reduceMotion } = prefs

  // Abertura da pilha guiada pela rolagem da janela.
  const progress = useStackProgress()
  const videoTransform = useLayerTransform(progress, POSE_VIDEO)
  const backTransform = useLayerTransform(progress, POSE_BACK)
  const frontTransform = useLayerTransform(progress, POSE_FRONT)
  const layerStyle = (mv: typeof videoTransform, pose: LayerPose) => ({
    transform: reduceMotion ? poseToTransform(pose, 0) : mv,
  })

  // Sol anda no sentido CONTRÁRIO ao cursor (6% da distância ao centro da tela).
  const mouse = useMousePosition()
  const sunX = useSpring(
    useTransform(mouse.x, (x) => (x - window.innerWidth / 2) * SUN_PARALLAX),
    sunSpring,
  )
  const sunY = useSpring(
    useTransform(mouse.y, (y) => (y - window.innerHeight / 2) * SUN_PARALLAX),
    sunSpring,
  )

  // Brilho: um círculo de luz que se move com transform (sem repintar gradiente).
  const glareX = useTransform(tilt.pointerX, (v) => `${v * 100}%`)
  const glareY = useTransform(tilt.pointerY, (v) => `${v * 100}%`)

  return (
    <div className="relative h-[clamp(480px,56vw,640px)] min-w-0 flex-[1_1_360px] isolate perspective-[1400px] max-sm:order-first max-sm:h-[420px]">
      <motion.div
        aria-hidden="true"
        // z-0: o sol fica sempre atrás da pilha (z-[1]), em qualquer layout
        className="hero-sun z-0"
        style={pointerFx ? { x: sunX, y: sunY } : undefined}
      />

      <motion.div
        className="absolute inset-0 z-[1] transform-3d"
        style={pointerFx ? { rotateX: tilt.rotateX, rotateY: tilt.rotateY } : undefined}
      >
        <div aria-hidden="true" className="hero-orbit" />

        {/* Camada principal: vídeo */}
        <motion.div
          className="hero-layer left-[6%] top-[6%] z-[2] h-[80%] w-[56%]"
          style={layerStyle(videoTransform, POSE_VIDEO)}
        >
          <HeroVideo
            startPaused={reduceMotion}
            frameClassName="relative size-full overflow-hidden bg-[#CDBBA3] motion-safe:animate-float"
          />
          {/* Brilho só existe com mouse: em touch ficaria parado tingindo o vídeo. */}
          {pointerFx && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-soft-light"
            >
              <motion.div
                className="absolute -left-1/2 -top-1/2 size-full bg-[radial-gradient(circle,rgb(255_255_255/0.55),transparent_50%)]"
                style={{ x: glareX, y: glareY }}
              />
            </div>
          )}
        </motion.div>

        {/* Camada de trás: body tricot */}
        <motion.div
          className="hero-layer right-0 top-0 h-1/2 w-[40%]"
          style={layerStyle(backTransform, POSE_BACK)}
        >
          <div className="relative size-full overflow-hidden bg-wine motion-safe:animate-float-slow">
            <img
              src={images.bodyCanelado.src}
              width={images.bodyCanelado.width}
              height={images.bodyCanelado.height}
              alt="Body tricot em três cores"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[50%_30%]"
            />
          </div>
        </motion.div>

        {/* Camada da frente: vestido plissado */}
        <motion.div
          className="hero-layer bottom-0 right-[6%] h-[44%] w-[36%]"
          style={layerStyle(frontTransform, POSE_FRONT)}
        >
          <div className="relative size-full overflow-hidden bg-[#E4D8C6] motion-safe:animate-float-mid">
            <img
              src={images.plissado.src}
              width={images.plissado.width}
              height={images.plissado.height}
              alt="Vestido longo plissado bege"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-[45%_35%]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
