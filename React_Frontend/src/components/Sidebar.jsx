// import React from 'react'

import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormContact from './formContact';

const Sidebar = () => {
  const calculatedHeight = {
    height: 'calc(100% - 5rem)',
  };

  const { isLogged } = useAuth();

  return (
    <aside
      style={calculatedHeight}
      className="fixed bottom-0 right-0 w-1/4 bg-red-800/50  p-3 text-right"
    >
      {isLogged ? (
        <ul className="h-full">
          <li className="h-1/3 rounded-md hover:bg-red-600">
            <NavLink
              to={'/admin/photos'}
              className={({ isActive }) =>
                isActive
                  ? 'flex h-full w-full items-center justify-center rounded-md bg-red-600 text-2xl'
                  : 'flex h-full w-full items-center justify-center rounded-md text-2xl'
              }
            >
              FOTO
            </NavLink>
          </li>
          <li className="h-1/3 rounded-md hover:bg-red-600">
            <NavLink
              to={'/admin/categories'}
              className={({ isActive }) =>
                isActive
                  ? 'flex h-full w-full items-center justify-center rounded-md bg-red-600 text-2xl'
                  : 'flex h-full w-full items-center justify-center rounded-md text-2xl'
              }
            >
              CATEGORIE
            </NavLink>
          </li>
          <li className="h-1/3 rounded-md hover:bg-red-600">
            <NavLink
              to={'/admin/messages'}
              className={({ isActive }) =>
                isActive
                  ? 'flex h-full w-full items-center justify-center rounded-md bg-red-600 text-2xl'
                  : 'flex h-full w-full items-center justify-center rounded-md text-2xl'
              }
            >
              MESSAGGI
            </NavLink>
          </li>
        </ul>
      ) : (
        <FormContact></FormContact>
      )}
    </aside>
  );
};

export default Sidebar;
