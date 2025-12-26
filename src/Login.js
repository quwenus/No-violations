import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useAuth } from './context/AuthContext';

function Login() {
    const { login: loginAuth } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });


        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        if (submitError) setSubmitError('');
    };

    const validateForm = () => {
        const newErrors = {};


        if (!validator.isLength(formData.login.trim(), { min: 3, max: 20 })) {
            newErrors.login = 'Логин должен быть от 3 до 20 символов';
        } else if (!validator.isAlphanumeric(formData.login, 'en-US', { ignore: '_' })) {
            newErrors.login = 'Только латинские буквы, цифры и _';
        }

        // Password validation
        if (!validator.isLength(formData.password, { min: 8 })) {
            newErrors.password = 'Пароль должен содержать минимум 8 символов';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) return;

        try {
            // 👇 Call your Express backend
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: formData.login,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка входа');
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            navigate('/account');
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    const navigateBack = () => navigate('/');
    const createAccount = () => navigate('/register');

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="formLayout">
                    <div className="loginHeader">Нарушениям. Нет</div>
                    <div className="loginSubtitle">Добро пожаловать</div>

                    <form onSubmit={handleSubmit} className="loginForm">
                        {submitError && (
                            <p className="error-text" style={{ textAlign: 'center', marginBottom: '16px' }}>
                                {submitError}
                            </p>
                        )}

                        <div className="inputGroup">
                            <label htmlFor="login" className="inputLabel">Логин</label>
                            <input
                                type="text"
                                className="input"
                                id="loginInput"
                                name="login"
                                value={formData.login}
                                onChange={handleChange}
                                required
                            />
                            {errors.login && <p className="error-text">{errors.login}</p>}
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="password" className="inputLabel">Пароль</label>
                            <input
                                type="password"
                                className="input"
                                id="passwordInput"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                            <button type="button" className="blueText" id="resetPassword">
                                Восстановить
                            </button>
                        </div>

                        <div className="buttonForm">
                            <button type="submit" className="loginButton">Войти</button>
                        </div>
                    </form>

                    <div className="moveToReg">
                        <p>Нет аккаунта?</p>
                        <button type="button" className="blueText" onClick={createAccount}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>

                <div className="goBack">
                    <button type="button" className="blueText" id="back" onClick={navigateBack}>
                        Вернуться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;