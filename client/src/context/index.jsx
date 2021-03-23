import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Context = React.createContext(null);

export default function MainContext({ children }) {
  return (
    <Context.Provider
      value={{
        
      }}
    >
      {children}
    </Context.Provider>
  );
}

MainContext.propTypes = {
  children: PropTypes.node.isRequired,
};
