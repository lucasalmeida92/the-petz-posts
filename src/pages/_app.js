import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import theme from '../styles/theme';
import 'nprogress/nprogress.css';

//Loading progress bar: Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
};

export default MyApp
