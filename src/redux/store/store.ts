
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/reducer';

const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});

export default store;