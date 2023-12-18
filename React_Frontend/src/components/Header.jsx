import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ButtonLoginLogout = () => {
  const { isLogged, handleLogout } = useAuth();

  return (
    <button
      onClick={isLogged && handleLogout}
      className="group relative flex h-16  w-64 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-red-800 p-2 font-extrabold text-red-50"
    >
      <div className="absolute right-20 top-3 z-10 h-40 w-40 rounded-full bg-red-900 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-32 w-32 rounded-full bg-red-800 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-24 w-24 rounded-full bg-red-700 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-14 w-14 rounded-full bg-red-600 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <p className="z-10">{isLogged ? 'Logout' : 'Login'}</p>
    </button>
  );
};

const ButtonHomeDashboard = () => {
  const { isLogged } = useAuth();

  return (
    <button className="group relative flex h-16  w-64 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-red-800 p-2 font-extrabold text-red-50">
      <div className="absolute right-20 top-3 z-10 h-40 w-40 rounded-full bg-red-900 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-32 w-32 rounded-full bg-red-800 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-24 w-24 rounded-full bg-red-700 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <div className="absolute right-20 top-3 z-10 h-14 w-14 rounded-full bg-red-600 duration-500 group-hover:-right-12 group-hover:top-12 group-hover:scale-150 group-hover:opacity-50"></div>
      <p className="z-10">{isLogged ? 'Dashboard' : 'Home'}</p>
    </button>
  );
};

const Header = () => {
  const { isLogged } = useAuth();

  return (
    <header className="fixed left-0 right-0  top-0 flex h-20 items-center justify-between bg-red-700 px-4 shadow-md shadow-red-900">
      <h1 className="text-2xl font-bold ">FotoBlog</h1>
      <nav>
        <ul className="flex items-center gap-3 ">
          <li>
            <Link to={!isLogged ? '/' : '/dashboard'}>
              <ButtonHomeDashboard />
            </Link>
          </li>
          <li>
            {!isLogged ? (
              <Link to={'/login'}>
                <ButtonLoginLogout />
              </Link>
            ) : (
              <ButtonLoginLogout />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
