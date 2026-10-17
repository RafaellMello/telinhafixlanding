import Lenis from 'lenis'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from './motion'
import { mountAllSections, whenAllSectionsLoaded } from './lazy-sections'
import { nativeScrollTo, ScrollCtx, type ScrollTarget } from './scroll-context'

type ScrollFn = (target: ScrollTarget) => void

const nextFrames = (n: number) =>
  new Promise<void>((resolve) => {
    const step = (left: number) => (left <= 0 ? resolve() : requestAnimationFrame(() => step(left - 1)))
    step(n)
  })

async function waitForElement(id: string, timeoutMs: number) {
  const deadline = performance.now() + timeoutMs
  let el = document.getElementById(id)
  while (!el && performance.now() < deadline) {
    await nextFrames(1)
    el = document.getElementById(id)
  }
  return el
}

async function waitForStableHeight(timeoutMs: number, stableFrames = 6) {
  const deadline = performance.now() + timeoutMs
  let last = document.documentElement.scrollHeight
  let same = 0
  while (same < stableFrames && performance.now() < deadline) {
    await nextFrames(1)
    const now = document.documentElement.scrollHeight
    same = now === last ? same + 1 : 0
    last = now
  }
}

/** O href de um clique comum num link interno (#algo), ou null se o navegador deve cuidar do clique. */
function internalHref(e: MouseEvent) {
  const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
  if (e.defaultPrevented || e.button !== 0 || modified) return null
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
  return link?.getAttribute('href') ?? null
}

/**
 * As seções abaixo da dobra só montam perto da tela, então antes de rolar até uma delas
 * monta todas, espera os chunks e recalcula os pins do GSAP.
 */
async function goToHash(hash: string, scrollTo: ScrollFn) {
  mountAllSections()
  await whenAllSectionsLoaded()
  // O React segura a troca do fallback pelo conteúdo por alguns centésimos: espera o alvo existir.
  const el = await waitForElement(decodeURIComponent(hash.slice(1)), 2000)
  if (!el) return
  // Cada seção que monta recalcula os pins e a página cresce; só rola quando a altura parar de mudar.
  await waitForStableHeight(1500)
  ScrollTrigger.refresh()
  await waitForStableHeight(500)
  if (el instanceof HTMLDetailsElement) el.open = true
  scrollTo(el)
  // Leva o foco junto, pra quem navega por teclado continuar dali (link de pular conteúdo incluso).
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** Liga o Lenis ao relógio do GSAP, pra rolagem suave e ScrollTrigger andarem no mesmo frame. */
function startLenis() {
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return {
    lenis,
    stop: () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    },
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const { lenis, stop } = startLenis()
    lenisRef.current = lenis
    return () => {
      stop()
      lenisRef.current = null
    }
  }, [])

  const scrollTo: ScrollFn = (target) => {
    const lenis = lenisRef.current
    if (!lenis) {
      nativeScrollTo(target)
      return
    }
    // O Lenis guarda o limite de rolagem em cache; se uma seção acabou de montar, ele ainda está curto.
    lenis.resize()
    lenis.scrollTo(target, { duration: 1.2 })
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const hash = internalHref(e)
      if (hash === null) return
      e.preventDefault()
      if (hash === '#' || hash === '#topo') {
        scrollTo(0)
        history.replaceState(null, '', location.pathname)
        return
      }
      history.replaceState(null, '', hash)
      goToHash(hash, scrollTo)
    }
    document.addEventListener('click', onClick)
    if (location.hash.length > 1) goToHash(location.hash, scrollTo)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return <ScrollCtx.Provider value={scrollTo}>{children}</ScrollCtx.Provider>
}
