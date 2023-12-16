// import React from 'react'

const Sidebar = () => {
  const calculatedHeight = {
    height: 'calc(100% - 5rem)',
  };

  return (
    <aside
      style={calculatedHeight}
      className="fixed bottom-0 right-0 w-1/4 bg-slate-800  px-3 text-right"
    >
      <ul>
        <li>Ciao</li>
        <li>Buongiorno</li>
        <li>Buonasera</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
