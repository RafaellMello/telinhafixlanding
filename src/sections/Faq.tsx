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
  /** Ocupa as duas colunas, com as perguntas lado a lado. */
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
      {
        q: 'Consigo ouvir os outros enquanto compartilho?',
        a: 'Consegue. Você ouve a tela dos amigos mesmo com a sua no ar, e o som que você manda deixa o próprio TelinhaFix de fora, então ninguém ouve eco.',
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
        q: 'Quantas pessoas precisa pro Codenames?',
        a: 'Cada time precisa de 1 mestre-espião e pelo menos 1 agente: 4 pessoas pra 2 times, 6 pro todos contra todos com 3. Quem não entrar em time fica assistindo.',
      },
      {
        q: 'As palavras do Codenames repetem muito?',
        a: 'São mais de 1000 palavras, com acento, sorteadas de novo a cada partida.',
      },
      {
        q: 'Dá pra jogar Codenames com câmera?',
        a: (
          <>
            Dá. O botão <b>“Ligar câmera”</b> dentro do jogo coloca sua câmera no lugar do avatar, na coluna do seu time.
          </>
        ),
      },
      {
        q: 'Minha internet caiu no meio da partida. Perdi meu lugar?',
        a: 'Não. Voltando com o mesmo nome, você cai no mesmo lugar do time. E se um time fica desfalcado, a vez dele é pulada pro jogo não travar.',
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

/** Categoria larga vira duas colunas independentes: abrir uma pergunta não abre buraco na outra. */
function columnsOf(cat: Category) {
  if (!cat.wide) return [cat.items]
  const half = Math.ceil(cat.items.length / 2)
  return [cat.items.slice(0, half), cat.items.slice(half)]
}

export default function Faq() {
  return (
    <section id="duvidas" className="faq" aria-labelledby="faq-titulo">
      <div className="wrap faq__inner">
        <header className="faq__head">
          <h2 id="faq-titulo">Dúvidas e Esclarecimentos</h2>
          <p>Instalação, sala, voz, qualidade e minijogos, separados pra você achar rápido.</p>
        </header>

        <div className="faq__grid">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className={cat.wide ? 'faq__cat faq__cat--wide' : 'faq__cat'}>
              <h3>{cat.title}</h3>
              <div className="faq__cols">
                {columnsOf(cat).map((items) => (
                  <div className="faq__list" key={items[0]?.q}>
                    {items.map((item, i) => (
                      <details key={item.q} id={item.id} open={i === 0}>
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
