import type { ReactNode } from 'react'
import { BUNNY_URL } from '../links'
import './Faq.css'

interface Item {
  q: string
  a: ReactNode
  /** Âncora pra links de outras seções (o passo 1 aponta pro aviso do Windows). */
  id?: string
}

const CATEGORIES: { title: string; items: Item[] }[] = [
  {
    title: 'Instalação',
    items: [
      { q: 'É grátis mesmo?', a: 'É. Baixa, instala e usa, sem pagar nada.' },
      {
        id: 'windows-avisa',
        q: 'Por que o Windows avisa quando eu instalo?',
        a: (
          <>
            Porque o instalador não tem a assinatura paga da Microsoft, que custa caro pra um app gratuito. Não é vírus,
            é só o Windows desconfiando de quem não pagou. Quando aparecer a tela azul, clica em{' '}
            <b>“Mais informações”</b> e depois em <b>“Executar assim mesmo”</b>.
          </>
        ),
      },
      { q: 'Funciona no Mac?', a: 'Não. O TelinhaFix é só pra Windows 10 e 11.' },
    ],
  },
  {
    title: 'Conta e sala',
    items: [
      { q: 'Precisa criar conta?', a: 'Não. Você coloca um nome, o código da sala e entra.' },
      {
        q: 'Como meus amigos entram na minha sala?',
        a: 'Manda o link de convite: quem clica cai direto na sala. Se preferir, passa o código e a pessoa digita no app.',
      },
    ],
  },
  {
    title: 'Áudio e Discord',
    items: [
      {
        q: 'Funciona com o Discord aberto?',
        a: (
          <>
            Funciona, e foi pensado pra isso. Na hora de compartilhar, escolhe <b>“Sistema, sem o Discord”</b>: o som do
            jogo vai, a call fica de fora e ninguém escuta a própria voz voltando.
          </>
        ),
      },
      {
        q: 'Dá pra mandar só o som do jogo?',
        a: (
          <>
            Dá. Escolhe <b>“Só um programa”</b> e marca o jogo: vai só o áudio dele, sem música, navegador ou notificação.
          </>
        ),
      },
    ],
  },
  {
    title: 'Qualidade e conexão',
    items: [
      {
        q: 'Qual qualidade dá pra usar?',
        a: 'De 720p a 4K, com 30, 60 ou 120 fps. O teste de desempenho mede o seu PC e a sua internet e mostra até onde dá pra ir sem travar.',
      },
      {
        q: 'E se a internet de alguém não deixar conectar direto?',
        a: 'A conexão é direta entre os PCs. Quando a rede não deixa, um servidor intermediário entra sozinho e ninguém precisa configurar nada.',
      },
    ],
  },
]

export default function Faq() {
  return (
    <section id="duvidas" className="faq" aria-labelledby="faq-titulo">
      <div className="wrap faq__inner">
        <header className="faq__head">
          <h2 id="faq-titulo">Dúvidas e Esclarecimentos</h2>
          <p>Instalação, sala, áudio e qualidade, lado a lado pra você achar rápido.</p>
        </header>

        <div className="faq__grid">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="faq__cat">
              <h3>{cat.title}</h3>
              <div className="faq__list">
                {cat.items.map((item, i) => (
                  <details key={item.q} id={item.id} open={i === 0}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="faq__more">
          Ficou alguma dúvida?{' '}
          <a href={BUNNY_URL} target="_blank" rel="noopener noreferrer">
            Fala com o Bunny
          </a>
        </p>
      </div>
    </section>
  )
}
