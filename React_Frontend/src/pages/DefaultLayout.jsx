import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const calculatedHeight = {
  height: 'calc(100% - 5rem)',
};

const DefaultLayout = () => {
  return (
    <>
      <Header></Header>
      <main
        style={calculatedHeight}
        className="fixed bottom-0 w-3/4 overflow-auto"
      >
        <Outlet></Outlet>
        <Sidebar></Sidebar>
      </main>
    </>
  );
};

export default DefaultLayout;
