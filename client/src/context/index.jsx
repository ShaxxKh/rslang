import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Context = React.createContext(null);

export default function MainContext({ children }) {
  const [words, setWords] = React.useState([])
  React.useEffect(() => {
    axios({
      url: 'https://sashan.herokuapp.com/words',
      method: 'GET',
    })
      .then(res => setWords(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Context.Provider
      value={{
        words
      }}
    >
      {children}
    </Context.Provider>
  );
}
MainContext.propTypes = {
  children: PropTypes.node.isRequired,
};
