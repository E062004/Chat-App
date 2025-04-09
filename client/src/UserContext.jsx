import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
  username: null,
  setUsername: () => {},
  id: null,
  setId: () => {},
  ready: false, // Add loading state
});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [ready, setReady] = useState(false); // Track if profile check is complete

  useEffect(() => {
    // Configure axios defaults once when context mounts
    axios.defaults.withCredentials = true;
    
    axios.get('/profile')
      .then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
      })
      .catch(error => {
        console.log('Not logged in or error fetching profile:', error);
        // No need to handle error here - just means user isn't logged in
      })
      .finally(() => {
        setReady(true); // Mark profile check as complete
      });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, ready }}>
      {children}
    </UserContext.Provider>
  );
}

