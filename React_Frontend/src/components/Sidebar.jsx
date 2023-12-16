// import React from 'react'

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const calculatedHeight = {
    height: 'calc(100% - 5rem)',
  };

  return (
    <aside
      style={calculatedHeight}
      className="fixed bottom-0 right-0 w-1/4 bg-slate-800  p-3 text-right"
    >
      <ul className="h-full">
        <li className="flex h-1/3 items-center justify-center hover:bg-slate-600">
          FOTO
        </li>
        <li className="flex h-1/3 items-center justify-center hover:bg-slate-600">
          <NavLink to={'/categories'} className={'text-2xl'}>
            CATEGORIE
          </NavLink>
        </li>
        <li className="flex h-1/3 items-center justify-center hover:bg-slate-600">
          <NavLink to={'/messages'} className={'text-2xl'}>
            MESSAGGI
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
