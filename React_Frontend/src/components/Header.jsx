const Header = () => {
  return (
    <header className="h-20 bg-green-700 px-2 flex justify-between items-center">
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
