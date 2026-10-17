import { Suspense, useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type CSSProperties } from 'react'
import { ScrollTrigger } from '../lib/motion'
import { getMountAll, subscribeMountAll } from '../lib/lazy-sections'

interface Props {
  component: ComponentType
  /** Altura reservada antes de montar, pra barra de rolagem não pular. */
  minHeight: string
}

/**
 * Monta a seção só quando ela chega perto da tela. O chunk do componente já pode ter sido
 * baixado antes (prefetchSections); aqui só decide quando renderizar.
 */
export function LazySection({ component: Section, minHeight }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const forced = useSyncExternalStore(subscribeMountAll, getMountAll)
  const show = near || forced

  useEffect(() => {
    if (show) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true)
      },
      { rootMargin: '120% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [show])

  return (
    <div ref={ref} style={show ? undefined : ({ minHeight } as CSSProperties)}>
      {show && (
        <Suspense fallback={<div style={{ minHeight }} />}>
          <Mounted component={Section} />
        </Suspense>
      )}
    </div>
  )
}

function Mounted({ component: Section }: { component: ComponentType }) {
  // Uma seção nova muda a altura da página: os gatilhos de scroll abaixo dela precisam recalcular.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [])
  return <Section />
}
