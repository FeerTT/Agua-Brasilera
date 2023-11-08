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
    <div className='app-container'>
      
      <h1 className='h1InicialApp'>
      
      <strong>App para la gestión de usuarios y consumos de agua potable Aldea Brasilera</strong>
      
  <div className='gestionInicial'>
    
      <button onClick={onClickUsuarios} className='botonIrMediciones'>
        PANEL USUARIOS
       <div className='dentrodelBotonUser'></div>
      </button>
      <button onClick={onClickMediciones} className='botonIrMediciones'>
        PANEL MEDICIONES
        <div className='dentrodelBoton'></div>
        
      </button>
    </div>
    
        </h1>
    
    </div>
  )
}
