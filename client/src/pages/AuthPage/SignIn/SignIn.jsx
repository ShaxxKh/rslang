import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignIn = () => (
  <div className="auth">
    <div className="auth__container container">
      <div className="auth__content">
        <h2>
          <span className="yellow-span">Мы скучали по тебе, </span>
          ты готов продолжить обучение?
        </h2>
      </div>
      <div className="auth__card form">
        <h3 className="form__title">Регистрация</h3>
        <form className="form__container">
          <TextField type="email" label="Email" className="form__input" />
          <TextField type="password" label="Пароль" className="form__input" />
          <Button type="submit" variant="contained" color="primary" className="form__btn">
            Войти
          </Button>
        </form>
        <p className="form__subheading">
          Нет аккаунта?
          <Link to="/sign-up"> Регистрация</Link>
        </p>
      </div>
    </div>
  </div>
);

export default SignIn;
