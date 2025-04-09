import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Routes from "./Routes";

// Critical configuration
axios.defaults.baseURL = 'https://chat-app-backend-b7tm.onrender.com';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor
axios.interceptors.request.use(config => {
  config.withCredentials = true; // Double ensure credentials
  return config;
});

function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}

export default App;
