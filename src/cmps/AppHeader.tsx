import { NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="logo"></div>
      <nav className="main-nav">
        <ul className="clean-list">
          <li>
            <NavLink end to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink end to="/stay">
              Stays
            </NavLink>
          </li>
          <li>
            <NavLink to="/stay/123">Stay Details</NavLink>
          </li>
          <li>
            <NavLink to="/stay/edit/123">Stay Edit</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
