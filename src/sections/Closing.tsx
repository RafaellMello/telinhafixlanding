import { DownloadButton } from '../components/DownloadButton'
import HalftoneWordmarkFooter, { type FooterColumn } from '../components/HalftoneWordmarkFooter'
import { BUNNY_URL, DOWNLOAD_URL, RELEASES_URL, REPO_URL } from '../links'
import { useScrollTo } from '../lib/scroll-context'
import './Closing.css'

const COLUMNS: FooterColumn[] = [
  { title: 'Baixar', links: [{ label: 'Windows 10 e 11', href: DOWNLOAD_URL }] },
  {
    title: 'Projeto',
    links: [
      { label: 'GitHub', href: REPO_URL, external: true },
      { label: 'Todas as versões', href: RELEASES_URL, external: true },
    ],
  },
  {
    title: 'Na página',
    links: [
      { label: 'Recursos', href: '#recursos' },
      { label: 'Codenames', href: '#codenames' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Dúvidas', href: '#duvidas' },
    ],
  },
]

export default function Closing() {
  const scrollTo = useScrollTo()

  return (
    <>
      <section className="final" aria-labelledby="final-titulo">
        <div className="wrap final__inner">
          <h2 id="final-titulo">Bora chamar o pessoal?</h2>
          <DownloadButton />
        </div>
      </section>

      <HalftoneWordmarkFooter
        wordmark="telinhafix"
        label="TelinhaFix"
        meta="Grátis • Windows 10/11 • sem conta"
        columns={COLUMNS}
        palette={{ background: '#060607', ink: '#f2f0ec', warm: '#ff3b2f' }}
        fontFamily="Poppins, system-ui, sans-serif"
        fontWeight={800}
        monoFamily="'JetBrains Mono', ui-monospace, Consolas, monospace"
        height="var(--footer-h)"
        onBackToTop={() => scrollTo(0)}
      >
        <p className="madeby">
          Feito por:{' '}
          <a href={BUNNY_URL} target="_blank" rel="noopener noreferrer">
            Bunny
          </a>
        </p>
      </HalftoneWordmarkFooter>
    </>
  )
}
