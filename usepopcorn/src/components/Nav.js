function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export default function Nav({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo></Logo>
      {children}
    </nav>
  );
}
