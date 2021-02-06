import { CssBaseline, GeistProvider } from '@geist-ui/react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import config from '../config'

const GlobalStyle = createGlobalStyle`
 body {
  width: 100%;
  min-height: 100vh;
}
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config?.page?.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={config?.page?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GeistProvider>
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default MyApp
