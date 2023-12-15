import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isLogged, handleLogout } = useAuth();

  return (
    <header className="flex h-20 items-center  justify-between bg-green-700 px-2">
      <h1 className="text-2xl font-bold">FotoBlog</h1>
      <nav>
        <ul className="flex items-center gap-3 ">
          <li>
            <NavLink to={'/'}>Home</NavLink>
          </li>
          <li>{!isLogged && <NavLink to={'/login'}>Login</NavLink>}</li>
          <li>{isLogged && <button onClick={handleLogout}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
