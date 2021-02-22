import { CssBaseline, GeistProvider } from '@geist-ui/react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import config from '../config'

const lightTheme = {
  type: 'Custom',
  palette: {
    accents_1: '#e1e4e8',
    accents_2: '#d1d5da',
    accents_3: '#959da5',
    accents_4: '#6a737d',
    accents_5: '#586069',
    accents_6: '#444d56',
    accents_7: '#2f363d',
    accents_8: '#24292e',
    background: '#fff',
    foreground: '#24292e',
    selection: '#0366d6',
    secondary: '#586069',
    code: '#24292e',
    border: '#e1e4e8',
    link: '#0366d6',
    success: '#34d058',
    warning: '#e3b341',
    error: '#f85149',
  },
  expressiveness: {
    dropdownBoxShadow: '0 8px 24px rgba(149,157,165,0.2)',
    shadowSmall: '0 1px 0 rgba(27,31,35,0.04)',
    shadowMedium: '0 3px 6px rgba(149,157,165,0.15)',
    shadowLarge: '0 8px 24px rgba(149,157,165,0.2)',
    portalOpacity: 0.75,
  },
  font: {
    sans:
      '"Inter", "Source Han Sans SC", "Source Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
}

const darkTheme = {
  type: 'Custom',
  palette: {
    accents_1: '#161b22',
    accents_2: '#2f363d',
    accents_3: '#444d56',
    accents_4: '#586069',
    accents_5: '#6a737d',
    accents_6: '#959da5',
    accents_7: '#d1d5da',
    accents_8: '#e1e4e8',
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
    dropdownBoxShadow: '0 16px 32px rgba(1,4,9,0.85)',
    shadowSmall: '0 0 transparent',
    shadowMedium: '0 3px 6px #010409',
    shadowLarge: '0 8px 24px #010409',
    portalOpacity: 0.75,
  },
  font: {
    sans:
      '"Inter", "Source Han sans SC", "Source Han Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
}

const GlobalStyle = createGlobalStyle`
 body {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
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
      <GeistProvider
        theme={config?.page?.theme === 'dark' ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default MyApp
