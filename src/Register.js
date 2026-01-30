import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fio: '',
        email: '',
        login: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!validator.isLength(formData.fio.trim(), { min: 2, max: 50 })) {
            newErrors.fio = 'ФИО должно содержать от 2 до 50 символов';
        }

        if (!validator.isEmail(formData.email.trim())) {
            newErrors.email = 'Пожалуйста, введите корректный email';
        }

        if (!validator.isLength(formData.login.trim(), { min: 3, max: 20 })) {
            newErrors.login = 'Логин должен быть от 3 до 20 символов';
        } else if (!validator.isAlphanumeric(formData.login, 'en-US', { ignore: '_' })) {
            newErrors.login = 'Логин может содержать только латинские буквы, цифры и символ "_"';
        }

        if (!validator.isLength(formData.password, { min: 8 })) {
            newErrors.password = 'Пароль должен содержать минимум 8 символов';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3000/register',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok){
                    navigate ('/login')
                }
                else {
                    const errorData = await response.json()
                    alert(errorData.error || 'Ошибка регистрации')
                }
            }
            catch (err) {
                console.error(err)
                alert('Не удалось подключиться к серверу')
            }
        }
    };

    const navigateBack = () => navigate('/');
    const goToLogin = () => navigate('/login'); // ← lowercase!

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="formLayout">
                    <div className="loginHeader">Нарушениям. Нет</div>
                    <div className="loginSubtitle">Создайте аккаунт</div>

                    <form onSubmit={handleSubmit} className="loginForm">
                        {/* Fio */}
                        <div className="inputGroup">
                            <label htmlFor="fio" className="inputLabel">ФИО</label>
                            <input
                                type="text"
                                className="input"
                                id="fioInput"
                                name="fio"                     // ← name="fio"
                                value={formData.fio}           // ← value from fio
                                onChange={handleChange}
                                required
                            />
                            {errors.fio && <p className="error-text">{errors.fio}</p>} {/* ← show fio error */}
                        </div>

                        {/* Email */}
                        <div className="inputGroup">
                            <label htmlFor="email" className="inputLabel">Эл. почта</label>
                            <input
                                type="email"
                                className="input"
                                id="emailInput"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        {/* Login */}
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

                        {/* Password */}
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
                        </div>

                        <div className="buttonForm">
                            <button type="submit" className="loginButton">Создать</button>
                        </div>
                    </form>

                    <div className="moveToReg">
                        <p>Уже есть аккаунт?</p>
                        <button type="button" className="blueText" onClick={goToLogin}>
                            Войти
                        </button>
                    </div>
                </div>

                <div className="goBack">
                    <button type="button" className="blueText" id='back' onClick={navigateBack}>
                        Вернуться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;