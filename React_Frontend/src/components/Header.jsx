const Header = () => {
  return (
    <header className="flex h-20 items-center  justify-between bg-green-700 px-2">
      <h1 className="text-2xl font-bold">FotoBlog</h1>
      <nav>
        <ul className="flex items-center gap-3 ">
          <li>Home</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
