import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import Routes from "./Routes";


import {UserContextProvider} from "./UserContext";



function App() {
  axios.defaults.baseURL = 'https://chat-app-backend-b7tm.onrender.com';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor
axios.interceptors.request.use(config => {
  config.withCredentials = true; // Double ensure credentials
  return config;
});

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
    
  );
}

export default App;

//

