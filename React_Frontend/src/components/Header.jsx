import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isLogged, handleLogout } = useAuth();

  return (
    <header className="fixed left-0 right-0  top-0 flex h-20 items-center justify-between bg-red-700 px-4">
      <h1 className="text-2xl font-bold">FotoBlog</h1>
      <nav>
        <ul className="flex items-center gap-3 ">
          <li>
            <Link to={'/'}>{isLogged ? 'Dashboard' : 'Home'}</Link>
          </li>
          <li>
            {!isLogged ? (
              <Link to={'/login'}>Login</Link>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
