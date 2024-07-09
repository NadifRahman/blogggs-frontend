import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './bootstrap.min.css';
import Navbar from './components/general/Navbar';

function App() {
  const [jwtToken, setJwtToken] = useState(null); //JWT TOKEN IS EITHER NULL OR THE ACTUAL TOKEN
  //NULL MEANS USER IS NOT LOGGED IN

  useEffect(() => {
    let fetchedFromStorage = localStorage.getItem('jwtToken');
    setJwtToken(fetchedFromStorage);
  });

  function setToken(token) {
    localStorage.setItem('jwtToken', token);
    setJwtToken(token);
  }

  function logOut() {
    localStorage.removeItem('jwtToken');
    setJwtToken(null);
  }

  return (
    <>
      <Navbar jwtToken={jwtToken} logOut={logOut}></Navbar>
      <Outlet context={{ jwtToken, setToken, logOut }} />
    </>
  );
}

export default App;
