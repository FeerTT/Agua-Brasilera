import { Dispatch, createAction } from "@reduxjs/toolkit";
import { Medicion, Usuario } from "@prisma/client";
import axios from "axios";

export const GET_USER_LIST = createAction<Usuario[]>("GET_USER_LIST");
export const AGREGAR_USUARIO = createAction<Usuario>("AGREGAR_USUARIO");
export const EDITAR_USUARIO = createAction<Usuario>("EDITAR_USUARIO");
export const UPDATE_USER_STATUS = createAction<{userId: number; active: boolean}>("ACTUALIZAR_ESTADO");
export const GET_MEDICIONES = createAction<Medicion[]>("GET_MEDICIONES");
export const CREAR_MEDICION = createAction<Medicion[]>("CREAR_MEDICION");
export const getMedicionMesAnterior = createAction("GET_MEDICION_MES_ANTERIOR");
export const ELIMINAR_MEDICION = createAction<Medicion[]>("ELIMINAR_MEDICIONES")


export const eliminarTodasLasMediciones = () => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete("http://localhost:3000/api/medicion/eliminar");
    } catch (error) {
      console.error("Error al eliminar todas las mediciones:", error);
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

// export const deleteUser = (usuarioId: number) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.patch<Usuario[]>(
//         `http://localhost:3000/api/usuarios/${usuarioId}`
//       );
//       dispatch({ type: ELIMINAR_USUARIO, payload: response.data });
//     } catch (error) {
//       console.error("Error al eliminar el usuario:", error);
//     }
//   };
// };

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

export const updateTotal = (medicionid: number, totalAPagar: number) =>{
  return async (dispatch: Dispatch) =>{
    try{
      const response = await axios.put<[]>("http://localhost:3000/api/medicion/modificarTotal", {
        medicionId: medicionid,
        totalAPagar,
      });
      dispatch(getMediciones() as any);
      return response.data;
    }catch(error){
      console.error('Error al actualizar el total a pagar:', error);
      throw error;
    }
  }
}

// export async function habilitarUser(userId: number, active: boolean): Promise<any> {
//   try {
//     const response = await axios.patch(`http://localhost:3000/api/usuarios/${userId}`, {
//       active,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error al actualizar el usuario', error);
//     throw error;
//   }
// }

export const updateUserStatus = (usuarioId: number, active: boolean) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch<Usuario[]>(
        `http://localhost:3000/api/usuarios/${usuarioId}`,
        { active }
      );
      const data = response.data
      dispatch(UPDATE_USER_STATUS(data as any));
    } catch (error) {
      console.error(`Error al ${active ? 'activar' : 'desactivar'} el usuario:`, error);
    }
  };
};