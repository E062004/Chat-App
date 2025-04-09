
      import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  ready: false
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/profile')
      .then(response => {
        setUser({
          id: response.data.userId,
          username: response.data.username
        });
      })
      .catch(error => {
        setUser(null); // Clear user on error
        console.log('Auth check:', error.response?.status === 401 
          ? 'Not logged in' 
          : 'Error checking auth');
      })
      .finally(() => setReady(true));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

