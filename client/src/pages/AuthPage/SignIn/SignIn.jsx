import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState('');

  const submitSignIn = React.useCallback(async (e) => {
    e.preventDefault();

  });

  return (
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
          <form className="form__container" onSubmit={submitSignIn}>
            <TextField
              type="input"
              label="Email"
              className="form__input"
              error={true}
              onBlur={(e) => setEmail('asdasdsad')}
            />
            <TextField
              type="password"
              label="Пароль"
              className="form__input"
              error={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="form__btn"
            >
              Войти
            </Button>
          </form>
          <p className="form__subheading">
            Нет аккаунта?
            <Link to="/sign-up" className="form__link">
              {' '}
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
