import '@/styles/globals.css'
import { Provider, useDispatch } from 'react-redux'
import store from '@/redux/store/store'
import React, {useEffect, useState}  from 'react'
import { AppProps } from 'next/app'
import '@/styles/styles.scss'
import Modal from 'react-modal'


require('dotenv').config();
Modal.setAppElement('#__next');
export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  )
}
