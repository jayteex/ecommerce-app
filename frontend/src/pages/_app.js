import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store'; 

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Router>
        <Component {...pageProps} />
      </Router>
    </Provider>
  );
}
