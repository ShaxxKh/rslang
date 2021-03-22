import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthHeader.scss';

import Logo from '../../../assets/imgs/Header/logo.png';

const AuthHeader = () => {
  const location = useLocation().pathname;
  const [isSignUp, setIsSignUp] = React.useState(false);

  React.useEffect(() => {
    if (location.includes('sign-up')) {
      setIsSignUp(true);
    }
  }, [isSignUp, location]);

  return (
    <div className="auth-header">
      <div className="auth-header__container container">
        <div className="auth-header__logo">
          <img src={Logo} alt="" />
        </div>
        <div className="auth-header__buttons">
          {(isSignUp
            && <button type="button" className="auth-header__button">Регистрация</button>)
            || <button type="button" className="auth-header__button">Войти</button>}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
