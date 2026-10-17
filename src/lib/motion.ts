import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export const REDUCED = '(prefers-reduced-motion: reduce)'
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
/** Telas grandes com mouse: onde o scroll lateral e o tilt pelo ponteiro fazem sentido. */
export const DESKTOP = '(min-width: 960px)'
export const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export const prefersReducedMotion = () => window.matchMedia(REDUCED).matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
