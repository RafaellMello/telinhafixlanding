import type { RefObject } from 'react'
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from './motion'

/**
 * Inclina `target` em 3D seguindo o ponteiro sobre `area`. Só com mouse e sem movimento reduzido.
 * `maxY` e `maxX` são os graus de giro nas bordas.
 */
export function usePointerTilt(area: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | null>, maxY = 9, maxX = 6) {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const el = area.current
      if (!el || !target.current) return
      const rotX = gsap.quickTo(target.current, 'rotateX', { duration: 0.9, ease: 'power3' })
      const rotY = gsap.quickTo(target.current, 'rotateY', { duration: 0.9, ease: 'power3' })
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        rotY(((e.clientX - r.left) / r.width - 0.5) * maxY * 2)
        rotX(-((e.clientY - r.top) / r.height - 0.5) * maxX * 2)
      }
      const onLeave = () => {
        rotX(0)
        rotY(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    })
  })
}
