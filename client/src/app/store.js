import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { todoSlice } from '../features/todos/todoSlice';

const authReducer = authSlice.reducer;
const todoReducer = todoSlice.reducer;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});
