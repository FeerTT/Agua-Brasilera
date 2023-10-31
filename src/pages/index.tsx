import Head from 'next/head'
import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { getUsers } from '@/redux/actions/action'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const router = useRouter();
  const dispatch = useDispatch();

  const onClickMediciones = () => {
    router.push('/mediciones');
  };

  const onClickUsuarios = () =>{
    router.push('/users')
  }

  return (
    <div className='divBackground'>
      <h1 className='h1InicialApp'>App para la gestión usuarios agua potable</h1>
    <div className='gestionInicial'>
    <button onClick={onClickMediciones} className='botonIrMediciones'>
        PANEL MEDICIONES
      </button>
      <button onClick={onClickUsuarios} className='botonIrMediciones'>
        PANEL USUARIOS
      </button>
    </div>
    </div>
  )
}
