import type { AppProps } from 'next/app'
import '../node_modules/modern-normalize/modern-normalize.css'
import '../components/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
