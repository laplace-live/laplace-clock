import 'kladenets'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { NextAdapter } from 'next-query-params'
import { QueryParamProvider } from 'use-query-params'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryParamProvider
      adapter={NextAdapter}
      options={{
        updateType: `replaceIn`,
        // removeDefaultsFromUrl: true,
      }}
    >
      <Component {...pageProps} />
    </QueryParamProvider>
  )
}
