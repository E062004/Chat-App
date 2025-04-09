import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  username: null,
  setUsername: () => {},
  id: null,
  setId: () => {},
  ready: false
});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/profile', { 
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    })
    .catch(error => {
      console.log('Auth check failed:', error.response?.status === 401 
        ? 'Not authenticated' 
        : 'Connection error');
      setId(null);
      setUsername(null);
    })
    .finally(() => setReady(true));
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, ready }}>
      {children}
    </UserContext.Provider>
  );
}
