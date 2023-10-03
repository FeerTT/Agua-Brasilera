import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/redux/store/store'
import React from 'react'
import { AppProps } from 'next/app'
import '@/styles/styles.scss'
import Modal from 'react-modal'




export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  )
}
