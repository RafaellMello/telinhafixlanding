import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// og:image e og:url precisam de URL absoluta. No Vercel, usa o domínio de produção do projeto;
// fora dele, cai no domínio padrão.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://telinhafixlanding.vercel.app'

const siteUrlPlugin = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
})

export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
})
