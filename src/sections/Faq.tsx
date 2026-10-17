import type { ReactNode } from 'react'
import { BUNNY_URL } from '../links'
import './Faq.css'

interface Item {
  q: string
  a: ReactNode
  /** Âncora pra links de outras seções (o passo 1 aponta pro aviso do Windows). */
  id?: string
}

interface Category {
  title: string
  items: Item[]
  /** Ocupa a largura toda, com as perguntas lado a lado. */
  wide?: boolean
}

const CATEGORIES: Category[] = [
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
    title: 'Sala e amigos',
    items: [
      { q: 'Precisa criar conta?', a: 'Não. Você coloca um nome, o código da sala e entra.' },
      {
        q: 'Como meus amigos entram na minha sala?',
        a: 'Manda o link de convite: clicou, entrou (na primeira vez o app só pede o nome). Se preferir, passa o código e a pessoa digita no app.',
      },
      {
        q: 'Quantas pessoas cabem numa sala?',
        a: 'Fica bom até umas 5 ou 6. Dá pra ter mais, mas aí quem compartilha precisa de bastante upload, porque a tela vai direto pra cada um.',
      },
    ],
  },
  {
    title: 'Voz e Discord',
    items: [
      {
        q: 'Dá pra conversar por voz no TelinhaFix?',
        a: 'Não, ele não usa microfone. O TelinhaFix cuida da tela e do som dela; pra conversar, a galera continua na call do Discord.',
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
      {
        q: 'Dá pra mandar só o som do jogo?',
        a: (
          <>
            Dá. Escolhe <b>“Só um programa”</b> e marca o jogo: vai só o áudio dele.
          </>
        ),
      },
    ],
  },
  {
    title: 'Transmissão e conexão',
    items: [
      {
        q: 'Qual qualidade dá pra usar?',
        a: 'De 720p a 4K, com 30, 60 ou 120 fps. O teste de desempenho mede o seu PC e a sua internet e mostra até onde dá pra ir sem travar.',
      },
      {
        q: 'Dá pra mostrar só uma janela em vez da tela toda?',
        a: (
          <>
            Dá. Na hora de compartilhar, escolhe <b>“Janela de um programa”</b> em vez de <b>“Tela inteira”</b>. Com mais
            de um monitor, você escolhe qual tela vai.
          </>
        ),
      },
      {
        q: 'Funciona no 4G ou em rede com firewall?',
        a: 'Funciona. A conexão é direta entre os PCs, e quando ela não fecha (4G, CGNAT, firewall) o vídeo passa por um servidor intermediário sozinho. Ninguém precisa configurar nada.',
      },
    ],
  },
  {
    title: 'Minijogos',
    wide: true,
    items: [
      {
        q: 'Quantas pessoas pro Codenames?',
        a: 'Cada time precisa de 1 mestre-espião e pelo menos 1 agente: 4 pessoas pra 2 times, 6 pro todos contra todos com 3. Quem não entrar em time fica assistindo.',
      },
      {
        q: 'Como funciona o Stop?',
        a: 'Sorteia uma letra e cada rodada tem 1 minuto. As categorias já vêm prontas (Nome, Animal, Fruta, Cor, País, Objeto) e dá pra trocar, de 2 a 10. Letra difícil como K, W, X, Y e Z não cai.',
      },
      {
        q: 'E o Sketch?',
        a: 'É o “Você prefere?”: alguém cria uma pergunta com duas opções e a sala vota ao vivo, vendo a contagem subir. Acaba quando todo mundo votou.',
      },
    ],
  },
]

/** Categoria larga põe cada pergunta numa coluna própria: abrir uma não abre buraco nas outras. */
function columnsOf(cat: Category) {
  return cat.wide ? cat.items.map((item) => [item]) : [cat.items]
}

export default function Faq() {
  return (
    <section id="duvidas" className="faq" aria-labelledby="faq-titulo">
      <div className="wrap faq__inner">
        <header className="faq__head">
          <h2 id="faq-titulo">Dúvidas e Esclarecimentos</h2>
          <p>Instalação, sala, voz, transmissão e minijogos, separados pra você achar rápido.</p>
        </header>

        <div className="faq__grid">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className={cat.wide ? 'faq__cat faq__cat--wide' : 'faq__cat'}>
              <h3>{cat.title}</h3>
              <div className="faq__cols">
                {columnsOf(cat).map((items) => (
                  <div className="faq__list" key={items[0]?.q}>
                    {items.map((item) => (
                      <details key={item.q} id={item.id}>
                        <summary>{item.q}</summary>
                        <p>{item.a}</p>
                      </details>
                    ))}
                  </div>
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
