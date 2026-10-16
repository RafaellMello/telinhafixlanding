# TelinhaFix — landing page

Página do [TelinhaFix](https://github.com/RafaellMello/telinhafix), app grátis pra Windows de compartilhar a tela com os amigos.

HTML e CSS puros, sem build e sem dependência. Pra ver localmente, é só abrir o `index.html`.

## Estrutura

- `index.html` — a página inteira
- `styles.css` — estilos (tokens de cor e tipografia no `:root`)
- `img/` — prints do app em WebP, logo e `og.png` (prévia no Discord/WhatsApp)
- `assets/` — logo original em PNG
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`

## Prints que faltam

Os espaços marcados com `[PRINT: …]` no HTML esperam prints reais:

- sala com 2 ou 3 amigos transmitindo ao mesmo tempo, com o controle de volume aberto
- partida de Stop
- alguém desenhando no Sketch

Pra trocar, substitua o `<div class="placeholder">` por um `<img>` com `width`, `height`, `alt` e `loading="lazy"`.

## Publicação

Feito pra rodar no GitHub Pages (branch `main`, raiz). A `og:image` aponta pra
`https://rafaellmello.github.io/telinhafixlanding/img/og.png`; se mudar o domínio, atualize essa URL no `index.html`.
