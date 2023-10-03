import { createAction } from '@reduxjs/toolkit';
import { Usuario } from '@prisma/client';
import axios from 'axios';




export const GET_USER_LIST = createAction<Usuario[]>('GET_USER_LIST');
export const AGREGAR_USUARIO = createAction<Usuario>('AGREGAR_USUARIO');
export const EDITAR_USUARIO = createAction<Usuario>('EDITAR_USUARIO');
export const ELIMINAR_USUARIO = createAction<number>('ELIMINAR_USUARIO');



export const getUsers = () => {
  return async (dispatch:any) => {
    try {
      const response = await axios.get<Usuario[]>('http://localhost:3000/api/usuarios');
      const data = response.data;
      dispatch(GET_USER_LIST(data));
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };
};


export const modificarUsers = (usuarioId: number, newData: Usuario) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.put<Usuario[]>(`http://localhost:3000/api/usuarios/${usuarioId}`, newData);
      dispatch({ type: EDITAR_USUARIO, payload: response.data });
      // dispatch({ type: CERRAR_MODAL_EDITAR_USUARIO });
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };
};

export const deleteUser = (usuarioId: number) => {
  return async (dispatch:any) =>{
    try{
      const response = await axios.delete<Usuario[]>(`http://localhost:3000/api/usuarios/${usuarioId}`);
      dispatch ({type: ELIMINAR_USUARIO, payload: response.data});
    }catch(error){
      console.error('Error al eliminar el usuario:', error);
    }
  };
};

export const createUser = (data: any) =>{
  return async (dispatch:any) =>{
    try{
      const jsonData = JSON.stringify(data);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<Usuario[]>('http://localhost:3000/api/usuarios/crear', jsonData, config)
      dispatch ({type: AGREGAR_USUARIO, payload: response.data});
    }catch(error){
      console.error('Error al crear el usuario', error);
    }
  };
};