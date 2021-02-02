import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Head from 'next/head'

import '../styles/style.scss'
import config from '../config'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config?.page?.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content={config?.page?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default MyApp
