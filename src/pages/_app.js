import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../app/store';
import theme from './../styles/theme';
// import '../../firebase-config';
import '../styles/globals.css';
import 'modern-normalize/modern-normalize.css';

function MyApp({ Component, pageProps }) {
  NProgress.configure({
    trickleSpeed: 400,
    trickleSpeed: 800,
    showSpinner: false,
    ease: 'ease',
    speed: 800,
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
