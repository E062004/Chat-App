

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import Routes from "./Routes";
import { UserContextProvider } from "./UserContext";

function App() {
  // Axios global configuration
  axios.defaults.baseURL = 'https://chat-app-backend-b7tm.onrender.com';
  axios.defaults.withCredentials = true;  // Critical for sending cookies
  axios.defaults.headers.common['Content-Type'] = 'application/json';

  // Add response interceptor for consistent error handling
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        console.log('Authentication required');
      }
      return Promise.reject(error);
    }
  );

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
