// import React from 'react'

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const calculatedHeight = {
    height: 'calc(100% - 5rem)',
  };

  return (
    <aside
      style={calculatedHeight}
      className="fixed bottom-0 right-0 w-1/4 bg-red-800/50  p-3 text-right"
    >
      <ul className="h-full">
        <li className="h-1/3 rounded-md hover:bg-red-600">
          <NavLink
            to={'/admin/photos'}
            className={
              'flex h-full w-full items-center justify-center text-2xl'
            }
          >
            FOTO
          </NavLink>
        </li>
        <li className="h-1/3 rounded-md hover:bg-red-600">
          <NavLink
            to={'/admin/categories'}
            className={
              'flex h-full w-full items-center justify-center text-2xl'
            }
          >
            CATEGORIE
          </NavLink>
        </li>
        <li className="h-1/3 rounded-md hover:bg-red-600">
          <NavLink
            to={'/admin/messages'}
            className={
              'flex h-full w-full items-center justify-center text-2xl'
            }
          >
            MESSAGGI
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
