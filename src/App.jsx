import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './bootstrap.min.css';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
