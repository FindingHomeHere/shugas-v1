import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import theme from '../theme';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Shuga's Restaurant | Bar</title>
        <meta
          name='description'
          content="Shuga's restaurant is a cute, artsy spot located downtown, serving various global fares and craft cocktails."
        />
        <meta
          name='keywords'
          content='restaurant, downtown, craft, cocktail bar, international, global, patio, bar'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest'></link>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
