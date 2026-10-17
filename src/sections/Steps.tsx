import './Steps.css'

export default function Steps() {
  return (
    <section id="como-funciona" className="steps" aria-labelledby="steps-titulo">
      <div className="wrap">
        <h2 id="steps-titulo">Do download à sala em três passos</h2>
        <ol className="steps__list">
          <li className="step">
            <span className="step__n num" aria-hidden="true">1</span>
            <h3>Baixa e instala</h3>
            <p>
              Um instalador só, pro Windows 10 ou 11. Se o Windows reclamar,{' '}
              <a href="#windows-avisa">a explicação tá aqui embaixo</a>.
            </p>
          </li>
          <li className="step">
            <span className="step__n num" aria-hidden="true">2</span>
            <h3>Coloca nome e código da sala</h3>
            <p>Sem cadastro, sem e-mail, sem senha.</p>
            <dl className="login-sample" aria-label="Exemplo de entrada">
              <div>
                <dt>nome</dt>
                <dd>bunny</dd>
              </div>
              <div>
                <dt>sala</dt>
                <dd className="is-room">resenha</dd>
              </div>
            </dl>
          </li>
          <li className="step">
            <span className="step__n num" aria-hidden="true">3</span>
            <h3>Manda o link pros amigos</h3>
            <p>Quem clica cai direto na sala. Quem ainda não tem o app já vê onde baixar.</p>
            <img
              className="step__img"
              src="/img/convite.webp"
              width={420}
              height={524}
              loading="lazy"
              decoding="async"
              alt="Página de convite do TelinhaFix: “Você foi convidado pro TelinhaFix”, sala resenha e os botões Abrir no TelinhaFix, Copiar código da sala e Não tenho o TelinhaFix - baixar."
            />
          </li>
        </ol>
      </div>
    </section>
  )
}
