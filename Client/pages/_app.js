import '../styles/globals.css';
import Layout from '../components/layout/layout';
import store from '../store/index';
import { Provider } from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
