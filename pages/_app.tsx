import type { AppProps } from 'next/app'

import '../styles/globals.css'
import { StateProvider } from '../src/providers/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp
