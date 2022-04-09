import '../styles/globals.css'
import type { AppProps } from 'next/app'

require("../styles/variables.less");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
