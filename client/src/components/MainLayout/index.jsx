import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthHeader from '../Header/AuthHeader/AuthHeader';
import MainHeader from '../Header/MainHeader/MainHeader';

export default function MainLayout({ children }) {
  const [token, setToken] = useState('');
  return (
    <>
      <header>
        { token ? <MainHeader /> : <AuthHeader /> }
      </header>
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
