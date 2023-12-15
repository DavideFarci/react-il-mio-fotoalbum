/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const GuestRoutes = ({ children }) => {
  const { isLogged } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard');
    }
  }, [isLogged]);
  return <>{children}</>;
};

export default GuestRoutes;
