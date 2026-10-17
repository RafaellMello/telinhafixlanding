import { useEffect } from 'react'
import { FluidBackground } from './components/FluidBackground'
import { Header } from './components/Header'
import { LazySection } from './components/LazySection'
import { lazySection, prefetchSections } from './lib/lazy-sections'
import { SmoothScroll } from './lib/smooth-scroll'
import { Hero } from './sections/Hero'

const Features = lazySection(() => import('./sections/Features'))
const Codenames = lazySection(() => import('./sections/Codenames'))
const Steps = lazySection(() => import('./sections/Steps'))
const Faq = lazySection(() => import('./sections/Faq'))
const Closing = lazySection(() => import('./sections/Closing'))

export default function App() {
  useEffect(() => prefetchSections(), [])

  return (
    <SmoothScroll>
      <FluidBackground />
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <LazySection component={Features} minHeight="100vh" />
        <LazySection component={Codenames} minHeight="120vh" />
        <LazySection component={Steps} minHeight="90vh" />
        <LazySection component={Faq} minHeight="60vh" />
      </main>
      <LazySection component={Closing} minHeight="100vh" />
    </SmoothScroll>
  )
}
