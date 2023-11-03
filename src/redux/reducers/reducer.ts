import { createReducer } from "@reduxjs/toolkit";
import {
  GET_USER_LIST,
  AGREGAR_USUARIO,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  GET_MEDICIONES,
  CREAR_MEDICION,
  getMedicionMesAnterior,
  UPDATE_USER_LIST,
} from "../actions/action";

type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
};

type Medicion = {
  id: number;
  mesActual: string;
  consumoDelMes: number;
  consumoDelMesAnterior: number;
  totalAPagar: number;
  tarifaExcedente: number;
  valorFijo: number;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
  };
};
// Define el tipo del estado
type UserState = {
  userList: Usuario[];
  medicionList: Medicion[];
};

const initialState: UserState = {
  userList: [],
  medicionList: [],
};
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GET_USER_LIST, (state, action) => {
      console.log(action.payload);
      const actualizados = action.payload.map((user: any) => {
        if (user.ultimaMedicion) {
          user.ultimaMedicion.consumoDelMesAnterior =
            user.ultimaMedicion.consumoDelMes;
        }
        return user;
      });
      console.log("actualziados", actualizados);
      state.userList = actualizados.sort((a, b) => a.id - b.id);;
    })
    .addCase(AGREGAR_USUARIO, (state, action) => {
      const newUser = action.payload;
      state.userList.push(newUser);
    })
    .addCase(EDITAR_USUARIO, (state, action) => {
      const editedUser = action.payload;
      const index = state.userList.findIndex(
        (user) => user.id === editedUser.id
      );
      if (index !== -1) {
        state.userList[index] = { ...state.userList[index], ...editedUser };
      }
    })
    .addCase(ELIMINAR_USUARIO, (state, action) => {
      const userIdToDelete = action.payload;
      state.userList = state.userList.filter(
        (user) => user.id !== userIdToDelete
      );
    })
    .addCase(GET_MEDICIONES, (state, action) => {
      state.medicionList = action.payload as any;
    })
    .addCase(CREAR_MEDICION, (state, action) => {
      const nuevaMedicion = action.payload as any;
      state.medicionList.push(nuevaMedicion);
    })
    .addCase(UPDATE_USER_LIST, (state, action) => {
      state.userList = action.payload;
    });
});
// export const userReducer = createReducer(initialState, {
//   [GET_USER_LIST.type]: (state, action) => {
//     state.userList = action.payload;
//   },
//   [AGREGAR_USUARIO.type]: (state, action) => {
//     const newUser = action.payload; // Supongo que el payload contiene el nuevo usuario
//     state.userList = [...state.userList, newUser];
//   },
//   [EDITAR_USUARIO.type]: (state, action) => {
//     const editedUser = action.payload;
//     const updatedUserList = state.userList.map((user) => {
//       if (user.id === editedUser.id) {
//         return {
//           ...user,
//           ...editedUser, // Actualiza los datos con los nuevos datos del servidor
//         };
//       } else {
//         return user;
//       }
//     });
//     state.userList = updatedUserList;
//   },
//   [ELIMINAR_USUARIO.type]: (state, action) => {
//     const userIdToDelete = action.payload;
//     state.userList = state.userList.filter(user => user.id !== userIdToDelete);
//   },
// });
