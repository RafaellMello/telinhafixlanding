# TelinhaFix — landing page

Página do [TelinhaFix](https://github.com/RafaellMello/telinhafix), app grátis pra Windows de compartilhar a tela com os amigos.

Vite + React + TypeScript, com GSAP (ScrollTrigger e SplitText) pros movimentos e Lenis pra rolagem suave.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run lint
```

## Publicar no Vercel

Importa o repositório no Vercel: ele detecta o Vite sozinho (build `npm run build`, saída `dist`). Não precisa de variável de ambiente.

A `og:image` e a `og:url` precisam de endereço absoluto. No build, o `vite.config.ts` troca `__SITE_URL__` no `index.html` pelo domínio de produção do projeto no Vercel (`VERCEL_PROJECT_PRODUCTION_URL`). Fora do Vercel, usa `https://telinhafixlanding.vercel.app`.

## Como a página está montada

- `src/sections/Hero.tsx` carrega junto com a página. As outras seções (`Features`, `Codenames`, `Steps`, `Faq`, `Closing`) são chunks separados: o navegador baixa quando fica ocioso e cada uma só monta quando chega perto da tela (`src/components/LazySection.tsx`).
- Links internos (`#recursos`, `#perguntas`...) passam por `src/lib/smooth-scroll.tsx`, que monta as seções que faltam antes de rolar.
- `src/sections/Features.tsx` é o trilho lateral: no desktop fica preso na tela e anda pro lado com o scroll. No celular e com "reduzir movimento" ligado, vira uma lista normal.
- Com "reduzir movimento" ligado no sistema, a rolagem suave, o 3D e as animações de scroll ficam desligados.
- `src/components/HalftoneWordmarkFooter.tsx` é o rodapé com o letreiro em pontos (canvas).

## Arquivos

- `public/img/` — prints do app em WebP e o logo
- `public/og.png` — prévia de link (Discord, WhatsApp)
- `assets/` — logo original em PNG
