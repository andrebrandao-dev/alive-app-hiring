import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from './store/store'; 

function App({ Component, pageProps }: AppProps) {
  console.log('App');
  debugger;
  return (
    <Provider store={(wrapper as any).store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App; 