import React, {useState} from 'react';
import './SignUp.scss';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";

const SignUp = () => {
    const {email, setEmail} = useState();
    const {password, setPassword} = useState();

    return (
        <div className="sign-up">
            <div className="sign-up__container container">
                <div className="sign-up__content">
                    <h2>Начнем наше путешествие с <span className="yellow-span">RSlang!</span></h2>
                </div>
                <div className="sign-up__card form">
                    <h3 className="form__title">Регистрация</h3>
                    <form className="form__container">
                        <TextField label="Email" className="form__input" />
                        <TextField label="Пароль" className="form__input" />
                        <TextField label="Повторите пароль" className="form__input" />
                        <Button variant="contained" color="primary" className="form__btn">
                            Регистарация
                        </Button>
                    </form>
                    <p className="form__subheading">Уже есть аккаунт? <Link to="/sing-in">Войти</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;