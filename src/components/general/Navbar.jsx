import React from 'react';
import { Link } from 'react-router-dom';
import NavStyle from './navbar.module.css';

export default function Navbar({ jwtToken, logOut }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark
     bg-primary px-3 sticky-top"
    >
      <Link className="navbar-brand" to="/">
        Blogggs
      </Link>

      <ul className="navbar-nav mr-auto">
        {jwtToken ? (
          <>
            <li className="nav-item nav-link">
              <Link className={NavStyle.link} to="/createblog">
                Create blog
              </Link>
            </li>
            <li
              className="nav-item nav-link"
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={logOut}
            >
              Log out
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
}
