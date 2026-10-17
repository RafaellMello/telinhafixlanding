import { useRef, type RefObject } from 'react'
import { DownloadButton } from '../components/DownloadButton'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../lib/motion'
import { usePointerTilt } from '../lib/usePointerTilt'
import './Hero.css'

interface HeroRefs {
  root: RefObject<HTMLElement | null>
  title: RefObject<HTMLHeadingElement | null>
  stage: RefObject<HTMLDivElement | null>
  screen: RefObject<HTMLDivElement | null>
}

/** Entrada do título e a telinha que fica de pé com o scroll. */
function useHeroMotion({ root, title, stage, screen }: HeroRefs) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        // O título sobe linha por linha uma vez, quando a página abre. As máscaras das linhas cortam
        // as pernas do "g" e do "p", então só existem durante a animação: no fim volta o texto normal.
        let split: SplitText | null = null
        let cancelled = false
        document.fonts.ready.then(() => {
          if (cancelled || !title.current) return
          split = SplitText.create(title.current, { type: 'lines', mask: 'lines' })
          gsap.from(split.lines, {
            yPercent: 108,
            duration: 1.15,
            ease: 'expo.out',
            stagger: 0.09,
            onComplete: () => split?.revert(),
          })
        })
        gsap.from('.hero__side', { y: 18, opacity: 0, duration: 1, delay: 0.35, ease: 'expo.out' })

        // A telinha começa deitada pra trás, como tela de notebook abrindo, e fica de pé com o scroll.
        const scrub = { trigger: stage.current, start: 'top bottom', end: 'center 62%', scrub: 0.7 }
        gsap.fromTo(screen.current, { rotateX: 30, scale: 0.9 }, { rotateX: 0, scale: 1, ease: 'none', scrollTrigger: scrub })

        // As etiquetas flutuam em profundidades diferentes e andam em velocidades diferentes.
        gsap.utils.toArray<HTMLElement>('.chip', root.current).forEach((chip) => {
          const depth = Number(chip.dataset.depth)
          gsap.set(chip, { z: depth })
          gsap.to(chip, {
            y: -depth * 0.55,
            ease: 'none',
            scrollTrigger: { trigger: stage.current, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        })

        return () => {
          cancelled = true
          split?.revert()
        }
      })
    },
    { scope: root },
  )
}

function Chips() {
  return (
    <>
      <p className="chip chip--live" data-depth="110" aria-hidden="true">
        <span className="chip__dot" />
        ao vivo · <span className="num">1080p · 60fps</span>
      </p>
      <p className="chip chip--audio" data-depth="160" aria-hidden="true">
        áudio: sistema, sem o Discord
      </p>
      <p className="chip chip--room" data-depth="70" aria-hidden="true">
        sala: <span className="chip__room">resenha</span>
      </p>
    </>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)

  useHeroMotion({ root, title, stage, screen })
  usePointerTilt(stage, tilt)

  return (
    <section className="hero" ref={root} aria-labelledby="hero-titulo">
      <div className="wrap">
        <h1 id="hero-titulo" ref={title} className="hero__title">
          Sua tela pros amigos, em&nbsp;1080p&nbsp;e <span className="mark">sem eco do Discord</span>.
        </h1>
        <div className="hero__side">
          <p className="hero__lead">
            Tipo o Go Live do Discord, só que você escolhe a qualidade (até 4K a 120&nbsp;fps), o som vai sem a call
            junto e, quando cansar, tem Codenames ali mesmo.
          </p>
          <DownloadButton />
        </div>
      </div>

      <div className="stage" ref={stage}>
        <div className="stage__screen" ref={screen}>
          <div className="stage__tilt" ref={tilt}>
            <img
              className="stage__shot"
              src="/img/seletor-compartilhar.webp"
              srcSet="/img/seletor-compartilhar.webp 801w, /img/seletor-compartilhar@2x.webp 1602w"
              sizes="(min-width: 1030px) 920px, calc(100vw - 32px)"
              width={801}
              height={686}
              fetchPriority="high"
              alt="Janela do TelinhaFix “Escolha o que compartilhar”: duas telas para escolher, resolução 1080p e 60 fps selecionados e áudio “Sistema, sem o Discord”."
            />
            <Chips />
          </div>
        </div>
      </div>
      {/* Daqui pra baixo o fundo animado aparece; o FluidBackground só renderiza depois deste ponto. */}
      <div className="hero__end" data-fluid-start aria-hidden="true" />
    </section>
  )
}
