import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthHeader from '../Header/AuthHeader/AuthHeader';
import MainHeader from '../Header/MainHeader/MainHeader';
import Sidebar from '../Header/Sidebar/Sidebar';

export default function MainLayout({ children }) {
  const location = useLocation();
  const [token, setToken] = useState('aasd'); // '' - you can see header when user loggined
  return (
    <>
      <header>
        {!token ? <MainHeader /> : <AuthHeader />}
      </header>
      {!token ? <Sidebar /> : <></>}
      <main className="body">
        {children}
      </main>
      <footer>
        Footer
      </footer>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
