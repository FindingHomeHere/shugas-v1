import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='https://use.typekit.net/nkq7dph.css'
          ></link>
          <link
            href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
