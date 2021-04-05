import { CssBaseline, GeistProvider } from '@geist-ui/react'
import App from 'next/app'
import { Router } from 'next/dist/client/router'
import { AppContextType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { config } from '../utils/load-config'
import { darkTheme, lightTheme } from '../utils/load-theme'

const GlobalStyle = createGlobalStyle`
 body {
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
`

function MyApp({ Component, pageProps, title, description, favicon, theme }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
      <GeistProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <GlobalStyle />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps, ...config }
}

export default MyApp
