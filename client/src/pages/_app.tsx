import '@/styles/globals.css'
import '@/styles/globalsMediaQueries.css'
import '@/styles/loader.css'
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app'
import { lazy, useEffect } from 'react';
import useLoader from '@/hooks/useLoader';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { MessageProvider } from '../context/MessageContext';
const Loader = lazy(() => import('@/components/common/Loader'));


function App({ Component, pageProps }: AppProps) {
  const isLoading = useLoader(3000);

  return (
    <Provider store={store}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </Provider>
  );
}
export default App;


