import { createContext, useContext } from 'react'

export type ScrollTarget = string | HTMLElement | number

/** Rolagem nativa: o que vale quando o Lenis está desligado (movimento reduzido). */
export function nativeScrollTo(target: ScrollTarget) {
  if (typeof target === 'number') {
    window.scrollTo({ top: target })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView()
}

export const ScrollCtx = createContext<(target: ScrollTarget) => void>(nativeScrollTo)

/** Rola até um alvo, passando pelo Lenis quando ele está ativo. */
export const useScrollTo = () => useContext(ScrollCtx)
