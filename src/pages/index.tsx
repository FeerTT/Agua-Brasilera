import Head from 'next/head'
import React, {useEffect, useState}  from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '@/redux/actions/action'
import { useRouter } from 'next/router'
import UserMensual from '@/components/usersMensual'
import CantidadUsers from '@/components/cantidadUsers'
import MedicionDelMes from '@/components/medicionDelMes'
import ActivityLog from '@/components/obtenerActividad'
import UsuariosPorMes from '@/components/usuariosDelMes'
import GraficoMediciones from '@/components/graficoConsumos'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const router = useRouter();
const userList = useSelector((state: any) => state.userReducer.userList);
const filteredUserList = useSelector((state: any) => state.userReducer.filteredUserList);
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(getUsers() as any);
  }, []);
  console.log(userList, filteredUserList, "console.log en index.tsx pagina principal")
  

  //PRUEBA DE IMPLEMENTACIÓN DE DESPLAZAMIENTO DE BOTON USUARIOS Y MEDICION

  const [showUsersOptions, setShowUsersOptions] = useState(false);

  const [showMeasurementsOptions, setShowMeasurementsOptions] = useState(false);

  const toggleOptions = (menu:any) => {
    if (menu === 'users') {
      setShowUsersOptions(!showUsersOptions);
      setShowMeasurementsOptions(false);
    } else if (menu === 'measurements') {
      setShowMeasurementsOptions(!showMeasurementsOptions);
      setShowUsersOptions(false); 
    }
  };



  //ACA TERMINA LA PRUEBA


  return (
  <>
  <div className="app-container">
  <div className="app-left">
    <button className="close-menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div className="app-logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>       </svg>
      <span>Admin</span>
    </div>
    <ul className="nav-list">
      <li className="nav-list-item active">
        <Link href={"/"}>
        <p className="nav-list-link" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-columns"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/></svg>
          Dashboard
        </p>
        </Link>
        
      </li>
      <li className="nav-list-item">
        <p className="nav-list-link" onClick={() => toggleOptions('users')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Usuarios
        </p>
        {showUsersOptions && (
          <div className="submenu">
            <Link href="/users/add">
              <p className="submenu-link">Crear Usuarios</p>
            </Link>
            <Link href="/users/list">
              <p className="submenu-link">Listado de Usuarios</p>
            </Link>
          </div>
        )}
      </li>
      <li className="nav-list-item">
        <p className="nav-list-link" onClick={() => toggleOptions('measurements')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
          Mediciones
        </p>
        {showMeasurementsOptions && (
          <div className="submenu">
            <Link href="/mediciones/mostrarUsers">
              <p className="submenu-link">Nueva Medición</p>
            </Link>
            <Link href="/mediciones/listar">
              <p className="submenu-link">Ver Mediciones</p>
            </Link>
          </div>
        )}
      </li>
      <li className="nav-list-item">
        <a className="nav-list-link" >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          Reports
        </a>
      </li>
    </ul>
  </div>
  <div className="app-main">
    <div className="main-header-line">
      <h1>Estadisticas Generales</h1>
      <div className="action-buttons">
        <button className="open-right-area">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </button>
      <button className="menu-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      </div>
    </div>
    <div className="chart-row three">
      <div className="chart-container-wrapper">
        <div className="chart-container">
          <CantidadUsers></CantidadUsers>
        </div>
      </div>
      <div className="chart-container-wrapper">
        
        <div className="chart-container">
          <div className="chart-info-wrapper">
            <h2 id='userTotal'>Totalidad de nuevos registros</h2>
            <span id='spanEsteMes'>Durante este mes:</span>
            <div id='divisorImportante'></div>
          </div>
          <div className="chart-svg">
            <UserMensual></UserMensual>
          </div>
        </div>
      </div>
      <div className="chart-container-wrapper">
        <div className="chart-container">
          <MedicionDelMes></MedicionDelMes>
        </div>
      </div>
    </div>
    <div className="chart-row two">
      <div className="chart-container-wrapper big">
        <div className="chart-container">
          <div className="chart-container-header">
            <h2>Top Consumos </h2>
            <span>Ultimos 30 dias</span>
            
          </div>
          <br></br>
          <GraficoMediciones></GraficoMediciones>
          <div className="line-chart">
            <canvas id="chart"></canvas>
          </div>
          <div className="chart-data-details">
            <div className="chart-details-header"></div>
          </div>
        </div>
      </div>
      <div className="chart-container-wrapper small">
        <div className="chart-container applicants">
          <div className="chart-container-header">
            <h2>Nuevos Usuarios</h2>
            <span>Mensual</span>
            </div>
            <div className='applicant-line'>
              <div className='applicant-info'>
                <UsuariosPorMes activities={userList}></UsuariosPorMes>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="app-right">
    <button className="close-right">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div className="profile-box">
      <div className="profile-photo-wrapper">
      <Image
        src="/imgperfil.jpeg"
        alt="profile"
        width={80}
        height={80}
        />
      </div>
      <p className="profile-text">Baron Stella Maris</p>
      <p className="profile-subtext">Responsable gestión usuarios</p>
    </div>
    <div className="app-right-content">
      
    <div className="app-right-section">
      <div className="app-right-section-header">
        <h2 id='h2ActividadesMes'>Actividades - Mes Actual</h2>
        <span className="notification-active">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </span>
        </div>
        <div className='activity-text-wrapper'>
          <br></br>
          <ActivityLog activities={userList}></ActivityLog>
        </div>
        
    </div>
    </div>
  </div>
  </div>
</>
  
    
    )
}

  {/* //   <div className='app-container'>
  //     <h1 className='h1InicialApp'>
      
  //     <strong>App para la gestión de usuarios y consumos de agua potable Aldea Brasilera</strong>
      
  // <div className='gestionInicial'>
    
  //     <button onClick={onClickUsuarios} className='botonIrMediciones'>
  //       PANEL USUARIOS
  //      <div className='dentrodelBotonUser'></div>
  //     </button>
  //     <button onClick={onClickMediciones} className='botonIrMediciones'>
  //       PANEL MEDICIONES
  //       <div className='dentrodelBoton'></div>
        
  //     </button>
  //   </div>
    
  //       </h1>
    
  //   </div>
  */}