import { lazy, type ComponentType } from 'react'

type Loader = () => Promise<{ default: ComponentType }>

const loaders = new Set<Loader>()
const listeners = new Set<() => void>()
let mountAll = false

/** Registra o import de uma seção e devolve o componente lazy dela. */
export function lazySection(load: Loader) {
  loaders.add(load)
  return lazy(load)
}

export function mountAllSections() {
  if (mountAll) return
  mountAll = true
  listeners.forEach((fn) => fn())
}

export const whenAllSectionsLoaded = () => Promise.all([...loaders].map((load) => load()))

export const subscribeMountAll = (fn: () => void) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const getMountAll = () => mountAll

/** Baixa os chunks das seções quando o navegador estiver ocioso, sem montar nada. */
export function prefetchSections() {
  const run = () => loaders.forEach((load) => load())
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 4000 })
  else setTimeout(run, 2500)
}
