import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';

function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
