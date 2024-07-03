import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './bootstrap.min.css';
import Navbar from './components/general/Navbar';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export default App;
