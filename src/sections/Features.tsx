import { useRef, type CSSProperties, type RefObject } from 'react'
import { DESKTOP, gsap, MOTION_OK, useGSAP } from '../lib/motion'
import './Features.css'

// Tamanho de cada número proporcional à largura da imagem (1280, 1920, 2560, 3840 px).
const RESOLUTIONS = [
  { label: '720p', k: 1 },
  { label: '1080p', k: 1.5, on: true },
  { label: '1440p', k: 2 },
  { label: '4K', k: 3 },
]

/**
 * No desktop o trilho fica preso na tela e anda pro lado com o scroll; cada visual entra
 * girado de lado e assenta de frente quando chega no meio.
 */
function useHorizontalScroll(root: RefObject<HTMLElement | null>, track: RefObject<HTMLDivElement | null>, bar: RefObject<HTMLSpanElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const el = track.current
        if (!el) return
        const distance = () => el.scrollWidth - window.innerWidth

        const slide = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        })

        gsap.utils.toArray<HTMLElement>('[data-turn]', el).forEach((vis) => {
          gsap.fromTo(
            vis,
            { rotateY: -24, z: -120, opacity: 0.35 },
            {
              rotateY: 0,
              z: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: vis, containerAnimation: slide, start: 'left 95%', end: 'center 55%', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="m6 10.2 2.7 2.7L14.2 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IntroPanel() {
  return (
    <div className="panel panel--intro">
      <h2 id="recursos-titulo">O básico, feito direito.</h2>
      <p>Nada de configuração escondida em cinco menus. O que importa pra mostrar a tela pros amigos tá na cara.</p>
      <p className="hs__hint" aria-hidden="true">
        Continua rolando
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M4 12h15m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </div>
  )
}

function QualityPanel() {
  return (
    <article className="panel panel--quality" aria-labelledby="f-qualidade">
      <div className="panel__visual" data-turn>
        <p className="scale" aria-label="Resoluções: 720p, 1080p, 1440p e 4K">
          {RESOLUTIONS.map((r) => (
            <span key={r.label} className={r.on ? 'is-on' : undefined} style={{ '--k': r.k } as CSSProperties}>
              {r.label}
            </span>
          ))}
        </p>
        <p className="fps" aria-label="30, 60 ou 120 quadros por segundo">
          <span>30</span>
          <span className="is-on">60</span>
          <span>120</span>
          <small>fps</small>
        </p>
        <p className="panel__note">Cada número tem o tamanho proporcional à largura da imagem.</p>
      </div>
      <div className="panel__copy">
        <h3 id="f-qualidade">Qualidade que você escolhe</h3>
        <p>
          De 720p a 4K, de 30 a 120 fps. Não sabe o que seu PC aguenta? O teste de desempenho mede o PC e a internet e
          te fala até onde dá pra ir sem travar.
        </p>
      </div>
    </article>
  )
}

function AudioPanel() {
  return (
    <article className="panel panel--audio" aria-labelledby="f-audio">
      <div className="panel__copy">
        <h3 id="f-audio">Áudio sem o Discord</h3>
        <p>
          O som do PC vai junto com a tela, menos o Discord. Quem tá na call não escuta a própria voz voltando. Quer
          mandar só o som do jogo? Escolhe um programa só.
        </p>
      </div>
      <ul className="options panel__visual" data-turn aria-label="As três opções de áudio do app">
        <li className="is-on">
          <Check />
          Sistema, sem o Discord
        </li>
        <li>Sistema todo</li>
        <li>Só um programa</li>
      </ul>
    </article>
  )
}

function ControlsPanel() {
  return (
    <article className="panel panel--controls" aria-labelledby="f-controles">
      <h3 id="f-controles" className="sr-only">
        Sem cursor e câmera
      </h3>
      <figure className="panel__visual bar-shot" data-turn>
        <img
          src="/img/barra-compartilhar.webp"
          width={888}
          height={56}
          loading="lazy"
          decoding="async"
          alt="Botões da sala do TelinhaFix: Compartilhar tela, Compartilhar sem cursor (beta) e Compartilhar câmera."
        />
        <figcaption>Os três botões no topo da sala.</figcaption>
      </figure>
      <div className="pair">
        <div>
          <h4>Sem cursor</h4>
          <p>A setinha do mouse some da transmissão. Em jogo, faz diferença. Ainda tá em beta.</p>
        </div>
        <div>
          <h4>Câmera</h4>
          <p>Uma bolinha da sua webcam por cima da tela. Ou só a câmera, quando a ideia é mostrar a cara mesmo.</p>
        </div>
      </div>
    </article>
  )
}

function TogetherPanel() {
  return (
    <article className="panel panel--together" aria-labelledby="f-junto">
      <div className="panel__copy">
        <h3 id="f-junto">Todo mundo junto</h3>
        <ul className="facts">
          <li>
            <b>Várias telas de uma vez.</b> Tela cheia, modo foco, ou esconde a de quem tá parado no menu.
          </li>
          <li>
            <b>Volume de cada um</b>, até <span className="num facts__big">200%</span>. Aquele amigo que fala baixo
            agradece.
          </li>
          <li>
            <b>Chat na sala</b>, pra mandar link sem sair do jogo.
          </li>
          <li>
            <b>Link de convite.</b> Clicou, entrou na sala.
          </li>
        </ul>
      </div>
    </article>
  )
}

function NetworkPanel() {
  return (
    <article className="panel panel--net" aria-labelledby="f-rede">
      <div className="panel__copy">
        <h3 id="f-rede">Direto de um PC pro outro</h3>
        <p>
          A conexão é P2P. Se a rede de alguém não deixar, um servidor intermediário entra sozinho e ninguém precisa
          mexer em nada.
        </p>
        <h3 className="panel__second">E ele se atualiza sozinho</h3>
        <p>Saiu versão nova, ele baixa. Na primeira vez que abre depois, mostra o que mudou, versão por versão.</p>
      </div>
      <figure className="panel__visual" data-turn>
        <img
          className="news-shot"
          src="/img/novidades.webp"
          width={532}
          height={376}
          loading="lazy"
          decoding="async"
          alt="Aba Novidades do TelinhaFix listando o que mudou nas versões 3.5.5 e 3.5.4."
        />
      </figure>
    </article>
  )
}

export default function Features() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  useHorizontalScroll(root, track, bar)

  return (
    <section id="recursos" className="hs" ref={root} aria-labelledby="recursos-titulo">
      <div className="hs__track" ref={track}>
        <IntroPanel />
        <QualityPanel />
        <AudioPanel />
        <ControlsPanel />
        <TogetherPanel />
        <NetworkPanel />
      </div>
      <div className="hs__progress" aria-hidden="true">
        <span ref={bar} />
      </div>
    </section>
  )
}
