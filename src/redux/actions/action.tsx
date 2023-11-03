import { Dispatch, createAction } from "@reduxjs/toolkit";
import { Medicion, Usuario } from "@prisma/client";
import axios from "axios";


export const GET_USER_LIST = createAction<Usuario[]>("GET_USER_LIST");
export const AGREGAR_USUARIO = createAction<Usuario>("AGREGAR_USUARIO");
export const EDITAR_USUARIO = createAction<Usuario>("EDITAR_USUARIO");
export const ELIMINAR_USUARIO = createAction<number>("ELIMINAR_USUARIO");
export const GET_MEDICIONES = createAction<Medicion[]>("GET_MEDICIONES");
export const CREAR_MEDICION = createAction<Medicion[]>("CREAR_MEDICION");
export const getMedicionMesAnterior = createAction("GET_MEDICION_MES_ANTERIOR");
export const ELIMINAR_MEDICION = createAction<Medicion[]>("ELIMINAR_MEDICIONES")
export const UPDATE_USER_LIST = createAction<[]>("UPDATE_USER_LIST")

export const eliminarTodasLasMediciones = () => {
  return async (dispatch: Dispatch) => {
    try {
      // Realiza una solicitud DELETE a la API para eliminar todas las mediciones
      await axios.delete("http://localhost:3000/api/medicion/eliminar");
      // Opcionalmente, puedes realizar alguna otra acción después de la eliminación exitosa
    } catch (error) {
      console.error("Error al eliminar todas las mediciones:", error);
      // Maneja cualquier error o muestra un mensaje de error al usuario si es necesario
    }
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<[]>(
        "http://localhost:3000/api/usuarios"
      );
      const {data } = response;
      dispatch(GET_USER_LIST(data));
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };
};

export const modificarUsers = (usuarioId: number, newData: Usuario) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put<Usuario[]>(
        `http://localhost:3000/api/usuarios/${usuarioId}`,
        newData
      );
      dispatch({ type: EDITAR_USUARIO, payload: response.data });
      // dispatch({ type: CERRAR_MODAL_EDITAR_USUARIO });
    } catch (error) {
      console.error("Error al modificar el usuario:", error);
    }
  };
};

export const deleteUser = (usuarioId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete<Usuario[]>(
        `http://localhost:3000/api/usuarios/${usuarioId}`
      );
      dispatch({ type: ELIMINAR_USUARIO, payload: response.data });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };
};

export const createUser = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const jsonData = JSON.stringify(data);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post<Usuario[]>(
        "http://localhost:3000/api/usuarios/crear",
        jsonData,
        config
      );
      dispatch({ type: AGREGAR_USUARIO, payload: response.data });
    } catch (error) {
      console.error("Error al crear el usuario", error);
    }
  };
};

export const getMediciones = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<Medicion[]>(
        "http://localhost:3000/api/medicion/traermediciones"
      );
      const data = response.data;
      dispatch(GET_MEDICIONES(data));
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };
};

export const crearMedicion = (form:[{}]) => {

  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<Medicion[]>("http://localhost:3000/api/medicion/nuevamedicion",form);
      const data = response.data;
      dispatch(CREAR_MEDICION(data))
    } catch (error) {
      console.error("Error al cargar una nueva medición:",error)
    }
  }
}

export const updateUserList = (updatedList: any) => {
  return {
    type: 'UPDATE_USER_LIST',
    payload: updatedList,
  };
};