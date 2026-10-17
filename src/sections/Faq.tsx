import type { ReactNode } from 'react'
import './Faq.css'

const QUESTIONS: { q: string; a: ReactNode; id?: string }[] = [
  { q: 'É grátis mesmo?', a: 'É. Baixa, instala e usa, sem pagar nada.' },
  { q: 'Precisa criar conta?', a: 'Não. Você coloca um nome, o código da sala e entra.' },
  { q: 'Funciona no Mac?', a: 'Não. O TelinhaFix é só pra Windows 10 e 11.' },
  {
    id: 'windows-avisa',
    q: 'Por que o Windows avisa quando eu instalo?',
    a: (
      <>
        Porque o instalador não tem a assinatura paga da Microsoft, que custa caro pra um app gratuito. Não é vírus, é
        só o Windows desconfiando de quem não pagou. Quando aparecer a tela azul, clica em <b>“Mais informações”</b> e
        depois em <b>“Executar assim mesmo”</b>.
      </>
    ),
  },
  {
    q: 'Funciona com o Discord aberto?',
    a: (
      <>
        Funciona, e foi pensado pra isso. Na hora de compartilhar, escolhe <b>“Sistema, sem o Discord”</b>: o som do
        jogo vai, a call fica de fora e ninguém escuta a própria voz voltando.
      </>
    ),
  },
]

export default function Faq() {
  return (
    <section id="perguntas" className="faq" aria-labelledby="faq-titulo">
      <div className="wrap faq__grid">
        <h2 id="faq-titulo">Perguntas rápidas</h2>
        <div className="faq__list">
          {QUESTIONS.map(({ q, a, id }) => (
            <details key={q} id={id}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
