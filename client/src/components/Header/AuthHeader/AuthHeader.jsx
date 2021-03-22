import React from 'react';
import './AuthHeader.scss';

import Logo from '../../../assets/imgs/Header/logo.png'

const AuthHeader = () => {
    return (
        <div className="auth-header">
            <div className="auth-header__container container">
                <div className="auth-header__logo">
                    <img src={Logo} alt=""/>
                </div>
                <div className="auth-header__buttons">
                    <button className="auth-header__button">Регистрация</button>
                    <button className="auth-header__button">Войти</button>
                </div>
            </div>
        </div>
    )
}

export default AuthHeader;