/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../utilities/fetchApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null,
  );
  const [isLogged, setIsLogged] = useState(false);
  const [initComplete, setInitComplete] = useState(false);
  const navigate = useNavigate();

  /**
   * Dopo che l'utente si è loggato,
   * devo salvare i suoi dati nella variabile user
   *
   * Devo anche salvare il JWT ricevuto dal server
   * @param {{token:string, user: {name:string, surname:string, email:string}}} resp
   */
  const handleLogin = (resp) => {
    setUser(resp.user);
    setIsLogged(true);

    saveToken(resp.token);
  };

  const handleLogout = () => {
    setUser(null);
    saveToken(null);

    localStorage.removeItem('token');
    setIsLogged(false);

    setTimeout(() => {
      navigate('/');
    });
  };

  // Funz. per salvare il token sia in uno state che nella localstorage
  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const getLoggedUser = async () => {
    const user = await fetchApi('/me');

    setUser(user);
    setIsLogged(true);
  };

  const initializeData = async () => {
    if (token) {
      await getLoggedUser();
    }

    setInitComplete(true);
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLogged, initComplete, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
