import React from 'react';
import PropTypes from 'prop-types';

export default function MainLayout({ children }) {
  return (
    <>
      <header>
        Header
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
