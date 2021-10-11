import React from 'react'
import {AppProps} from 'next/app'
import {StyleProvider, ThemePicker} from 'vcc-ui'

import '../public/css/styles.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
  );
}

export default MyApp
