import React from 'react';
import PropTypes from 'prop-types';
import AuthHeader from '../Header/AuthHeader/AuthHeader';

export default function MainLayout({ children }) {
  return (
    <>
      <header>
        <AuthHeader />
      </header>
      <div className="body">
        {children}
      </div>
      <footer>
        Footer
      </footer>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
