import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

// Campo de fluido em WebGL: ruído simplex deformando um "feixe" que atravessa a tela.
// Mesmo shader do fundo "Aura UI fluid", reescrito sem three.js e com as cores do site.
// A intensidade é baixa de propósito: no ponto mais vermelho o texto cinza ainda passa AA.

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAGMENT = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 base = vec3(0.0235, 0.0235, 0.027);           // #060607
  vec2 st = uv * 0.7;
  st += vec2(snoise(st + u_time * 0.05), snoise(st - u_time * 0.05)) * 0.3;

  float beam = smoothstep(0.1, 0.8, snoise(vec2(st.x + st.y * 1.5 - u_time * 0.15, u_time * 0.02)));
  vec3 red = vec3(0.886, 0.137, 0.102);              // #e2231a
  vec3 deep = vec3(0.45, 0.05, 0.035);               // entre #e2231a e #3a0a08
  vec3 glow = mix(deep, red, snoise(uv * 1.5 + u_time * 0.1) * 0.5 + 0.5);

  gl_FragColor = vec4(base + glow * beam * 0.26, 1.0);
}
`

/** Fração da resolução do aparelho: o campo é borrado por natureza, meia resolução não aparece. */
const RENDER_SCALE = 0.5

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
  const program = gl.createProgram()
  if (!vs || !fs || !program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  // Um triângulo que cobre a tela inteira.
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  return {
    time: gl.getUniformLocation(program, 'u_time'),
    resolution: gl.getUniformLocation(program, 'u_resolution'),
  }
}

/**
 * Fundo fixo atrás da página. Só renderiza depois que o fim do hero (o elemento com
 * `data-fluid-start`) entra na tela, porque antes disso o hero cobre tudo.
 */
export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!canvas || !gl) return
    const uniforms = createProgram(gl)
    if (!uniforms) return

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE
      canvas.width = Math.max(1, Math.round(window.innerWidth * scale))
      canvas.height = Math.max(1, Math.round(window.innerHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
    }
    const render = (seconds: number) => {
      gl.uniform1f(uniforms.time, seconds)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    resize()
    const reduced = prefersReducedMotion()
    // Movimento reduzido: um quadro parado.
    render(reduced ? 12 : 0)

    let raf = 0
    let active = false
    const start = performance.now()
    const loop = (now: number) => {
      render((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    const setActive = (on: boolean) => {
      if (on === active || reduced) return
      active = on
      if (on) raf = requestAnimationFrame(loop)
      else cancelAnimationFrame(raf)
    }

    const startMark = document.querySelector('[data-fluid-start]')
    const io = new IntersectionObserver(([entry]) => {
      if (entry) setActive(entry.isIntersecting || entry.boundingClientRect.top < 0)
    })
    if (startMark) io.observe(startMark)
    else setActive(true)

    const onResize = () => {
      resize()
      if (!active) render(reduced ? 12 : (performance.now() - start) / 1000)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fluid-bg" aria-hidden="true" />
}
