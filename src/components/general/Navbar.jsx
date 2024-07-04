import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from './navbar.module.css';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark
     bg-primary px-3 sticky-top"
    >
      <Link className="navbar-brand" to="/">
        Bloggs
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item nav-link ">
          <Link className={NavStyle.link} to="/log-in">
            Log in
          </Link>
        </li>
        <li className="nav-item nav-link">
          <Link className={NavStyle.link} to="/sign-up">
            Sign up
          </Link>
          {/*come back and add log out button which just deletes the token */}
        </li>
      </ul>
    </nav>
  );
}
