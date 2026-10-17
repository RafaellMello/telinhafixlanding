import { DOWNLOAD_URL } from '../links'
import './Header.css'

export function Header() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a className="brand" href="#topo" aria-label="TelinhaFix, início">
          <img src="/img/logo-96.png" width="34" height="34" alt="" />
          <span>TelinhaFix</span>
        </a>
        <nav className="topnav" aria-label="Seções">
          <a href="#recursos">Recursos</a>
          <a href="#codenames">Codenames</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#perguntas">Perguntas</a>
        </nav>
        <a className="btn btn--small topbar__cta" href={DOWNLOAD_URL}>
          Baixar
        </a>
      </div>
    </header>
  )
}
