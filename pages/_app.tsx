import { CssBaseline, GeistProvider } from '@geist-ui/react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import config from '../config'

const customTheme = {
  type: 'Custom',
  palette: {
    accents_1: '#111',
    accents_2: '#333',
    accents_3: '#444',
    accents_4: '#666',
    accents_5: '#888',
    accents_6: '#999',
    accents_7: '#eaeaea',
    accents_8: '#fafafa',
    background: '#0D1117',
    foreground: '#c9d1d9',
    selection: '#1f6feb',
    secondary: '#8b949e',
    code: '#c9d1d9',
    border: '#30363d',
    link: '#58a6ff',
    success: '#56d364',
    warning: '#e3b341',
    error: '#f85149',
  },
  expressiveness: {
    dropdownBoxShadow: ' 0 16px 32px rgba(1,4,9,0.85)',
    shadowSmall: '0 0 transparent',
    shadowMedium: '0 3px 6px #010409',
    shadowLarge: '0 8px 24px #010409',
    portalOpacity: 0.75,
  },
}

const GlobalStyle = createGlobalStyle`
 body {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
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
      <GeistProvider theme={customTheme}>
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default MyApp
