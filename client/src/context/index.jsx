import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export const Context = React.createContext(null);

export default function MainContext({ children }) {
  const [words, setWords] = React.useState([])
	const [isAuth, setAuth] = React.useState(localStorage.getItem('isAuth') || false)
  console.log(isAuth)
  React.useEffect(() => {
    axios({
      url: 'https://sashan.herokuapp.com/words',
      method: 'GET',
    })
      .then(res => setWords(res.data))
      .catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    localStorage.setItem('isAuth', isAuth)
  }, [isAuth])

  return (
    <Context.Provider
      value={{
        words,
				isAuth,
				setAuth
      }}
    >
      {children}
    </Context.Provider>
  );
}
MainContext.propTypes = {
  children: PropTypes.node.isRequired,
};
