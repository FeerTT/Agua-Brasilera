import { createReducer } from "@reduxjs/toolkit";
import {
  GET_USER_LIST,
  AGREGAR_USUARIO,
  EDITAR_USUARIO,
  GET_MEDICIONES,
  CREAR_MEDICION,
  getMedicionMesAnterior,
  UPDATE_USER_STATUS,
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

type UserState = {
  userList: Usuario[];
  medicionList: Medicion[];
  filteredUserList: Usuario[];
};

const initialState: UserState = {
  userList: [],
  medicionList: [],
  filteredUserList: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(GET_USER_LIST, (state, action) => {
    const actualizados = action.payload.map((user: any) => {
      if (user.ultimaMedicion) {
        user.ultimaMedicion.consumoDelMesAnterior =
          user.ultimaMedicion.consumoDelMes;
      }
      return user;
    });
  const activeUserList = actualizados.filter((user) => user.active === true);

  const sortedActiveUserList = activeUserList.sort((a, b) => a.id - b.id);
  const sortedAllUserList = actualizados.sort((a, b) => a.id - b.id);

  // state.userList = sortedAllUserList;
  // state.filteredUserList = sortedActiveUserList;
  return {
    ...state,
    userList: sortedAllUserList,
    filteredUserList: sortedActiveUserList,
  };

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
    .addCase(UPDATE_USER_STATUS, (state, action:any) => {
      const { userId, active } = action.payload;
      if (active === false) {
        state.userList = state.userList.map(user =>
          user.id === userId ? { ...user, active: false } : user
        );
      } else {
        const activatedUser = state.userList.find(user => user.id === userId);
        if (activatedUser) {
          console.log(`Usuario ${activatedUser.nombre} activado.`);
        }
      }
    })
    .addCase(GET_MEDICIONES, (state, action) => {
      state.medicionList = action.payload.sort((a, b) => a.id - b.id) as any;
    })
    .addCase(CREAR_MEDICION, (state, action) => {
      const nuevaMedicion = action.payload as any;
      state.medicionList.push(nuevaMedicion);
    })
});
// builder
  //   .addCase(GET_USER_LIST, (state, action) => {
  //     console.log(action.payload);
  //     const actualizados = action.payload.map((user: any) => {
  //       if (user.ultimaMedicion) {
  //         user.ultimaMedicion.consumoDelMesAnterior =
  //           user.ultimaMedicion.consumoDelMes;
  //       }
  //       return user;
  //     });
  //     console.log("actualziados", actualizados);
  //     state.userList = actualizados.sort((a, b) => a.id - b.id);;
  //   })