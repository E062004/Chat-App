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
    axios.get('/profile', { withCredentials: true })
      .then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
      })
      .catch(error => {
        // Clear invalid auth state
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
