import { DOWNLOAD_URL } from '../links'

export function WindowsIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M0 2.2 6.5 1.3v6.3H0zm7.3-1L16 0v7.6H7.3zM0 8.4h6.5v6.3L0 13.8zm7.3 0H16V16l-8.7-1.2z" />
    </svg>
  )
}

export function DownloadButton({ meta = true }: { meta?: boolean }) {
  return (
    <div className="cta">
      <a className="btn" href={DOWNLOAD_URL}>
        <WindowsIcon />
        Baixar para Windows
      </a>
      {meta && <p className="cta__meta">Grátis • Windows 10/11 • sem conta</p>}
    </div>
  )
}
