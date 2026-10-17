import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../lib/motion'
import './Codenames.css'

export default function Codenames() {
  const root = useRef<HTMLElement>(null)
  const table = useRef<HTMLDivElement>(null)
  const board = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // O tabuleiro começa deitado, como na mesa, e levanta pra ficar de frente. Fica reto quando o topo
      // dele chega a 25% da tela (não depende da altura dele), e a curva desacelera no fim: a maior parte
      // do giro acontece logo que ele entra.
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          board.current,
          { rotateX: 50, scale: 0.88, yPercent: 6 },
          {
            rotateX: 0,
            scale: 1,
            yPercent: 0,
            ease: 'power2.out',
            // Gatilho no container, que não gira: o próprio tabuleiro inclinado mede mais baixo do que está.
            scrollTrigger: { trigger: table.current, start: 'top bottom', end: 'top 25%', scrub: 0.4 },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section id="codenames" className="cn" ref={root} aria-labelledby="cn-titulo">
      <div className="wrap cn__head">
        <h2 id="cn-titulo">E quando bater o tédio, tem Codenames.</h2>
        <p>Dentro da call. Ninguém precisa abrir site nem criar conta em outro lugar.</p>
      </div>

      <div className="cn__table" ref={table}>
        <figure className="cn__board" ref={board}>
          <img
            src="/img/codenames-3-times.webp"
            srcSet="/img/codenames-3-times.webp 1078w, /img/codenames-3-times@2x.webp 2156w"
            sizes="(min-width: 1190px) 1080px, calc(100vw - 32px)"
            width={1078}
            height={817}
            loading="lazy"
            decoding="async"
            alt="Partida de Codenames no TelinhaFix com três equipes (vermelha, verde e azul), tabuleiro de 25 palavras e histórico de pistas."
          />
        </figure>
      </div>

      <div className="wrap cn__body">
        <p className="cn__desc">
          Dois times, ou três no todos contra todos. Tem mestre-espião, cronômetro pra ninguém enrolar, histórico das
          dicas e efeito quando alguém acha o assassino.
        </p>
        <dl className="cn__spec">
          <div>
            <dt>Times</dt>
            <dd>2 ou 3, todos contra todos</dd>
          </div>
          <div>
            <dt>Tempo</dt>
            <dd>
              <span className="num">01:30</span> pra escolher depois da pista
            </dd>
          </div>
        </dl>
        <p className="cn__also">Também tem Stop e Sketch no mesmo menu de jogos.</p>
      </div>
    </section>
  )
}
