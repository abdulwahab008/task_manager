import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer
  },
});