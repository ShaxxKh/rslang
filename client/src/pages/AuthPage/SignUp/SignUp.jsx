import React from 'react';
import './SignUp.scss';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const submitSignUp = React.useCallback(async (e) => {
    e.preventDefault();
  });

  return (
    <div className="auth">
      <div className="auth__container container">
        <div className="auth__content">
          <h2>
            Начнем наше путешествие с
            <span className="yellow-span"> RSlang!</span>
          </h2>
        </div>
        <div className="auth__card form">
          <h3 className="form__title">Регистрация</h3>
          <form className="form__container" onSubmit={submitSignUp}>
            <TextField
              type="email"
              label="Email"
              className="form__input"
              error={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Пароль"
              className="form__input"
              error={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              label="Повторите пароль"
              className="form__input"
              error={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="form__btn"
            >
              Регистарация
            </Button>
          </form>
          <p className="form__subheading">
            Уже есть аккаунт?
            <Link to="/sign-in" className="form__link">
              {' '}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
