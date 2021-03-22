import React from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export default function MainContext({ children }) {
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  );
}

MainContext.propTypes = {
  children: PropTypes.node.isRequired,
};
