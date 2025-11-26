import axios from 'axios';
import { reset } from './authSlice';

const API_URL = '/api/users/';

// Register new user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  console.log('From register function in authService:');
  console.log('Registered user: ', response.data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login existing user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  console.log('From login function in authService:');
  console.log('Logged in user: ', response.data);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout current user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
