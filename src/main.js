import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useTheme } from './ThemeContext';
import { useSmoothScroll } from "./components/SmoothScroll";
import MoonIcon from "./components/MoonIcon";
import SunIcon from "./components/SunIcon";
import Rocket from "./assets/rocket.svg";
import Shield from "./assets/shield.svg";
import Stats from "./assets/stats.svg";



function Header() {

    const { theme, toggleTheme } = useTheme();
    const SmoothScroll = useSmoothScroll(80)

    return (
        <header className="header">
            <div className="menu">
                <h1 className="header-title">Нарушениям. Нет</h1>

                <nav className="nav">
                    <a href="/" className="nav-link">Главная</a>
                    <a href="#about" className="nav-link"
                        onClick={(e) => {
                            e.preventDefault();
                            SmoothScroll('about')
                        }}>О проекте</a>
                    <Link to={"/Login"} className="nav-link">Войти</Link>
                    <Link to={"/Application"} className="application">Подать заявление</Link>
                    <button className="darkMode"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px',
                            color: 'var(--text-color)',
                            fontSize: '24px' 
                        }}
                    >
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                </nav>
            </div>
        </header>
    );
}

function Main() {

    const SmoothScroll = useSmoothScroll(80)

    return (
        <main className="main">
            <div className="small-info" id="info">
                <div className="header-subtitle">
                    <p>Вместе сделаем дороги <span className="safe">безопаснее!</span></p>
                </div>
                <p className="information">Проект "Нарушениям. Нет" создан с целью повышения безопасности на дорогах.</p>
                <div className="buttons">
                    <Link to={"/Application"} className="application">Подать заявление</Link>
                    <a href="" className="nav-link more" onClick={(e) => {
                        e.preventDefault();
                        SmoothScroll('about')
                    }}>Подробнее</a>
                </div>
            </div>
            <div className="advantage" id="about">
                <div className="title">
                    <p>Наши преимущества</p>
                </div>
                <div className="sub-title">
                    <p>Всё, что нужно в одном месте</p>
                </div>
                <div className="cardsFrame">
                    <div className="card">
                        <div className="cardImg">
                            <img
                                src={Rocket}
                                width={50}
                            />
                        </div>
                        <div className="cardName">
                            Скорость
                        </div>
                        <div className="cardTitle">
                            Информация о нарушении попадает в руки правоохранителей в считанные минуты
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img
                                src={Shield}
                                width={50}
                            />
                        </div>
                        <div className="cardName">
                            Безопасность
                        </div>
                        <div className="cardTitle">
                            Ваши данные защищены. Мы не передаём вашу личную информацию без вашего согласия
                        </div>
                    </div>
                    <div className="card">
                        <div className="cardImg">
                            <img
                                src={Stats}
                                width={50}
                            />
                        </div>
                        <div className="cardName">
                            Эффективность
                        </div>
                        <div className="cardTitle">
                            Каждое ваше сообщение — это вклад в безопасность на дорогах
                        </div>
                    </div>
                </div>
                <div className="statsInfo">
                    <div className="statCard">
                        <div className="statInf">
                            {'>'}50тыс.
                        </div>
                        <div className="statSubTitle">
                            Активных пользователей
                        </div>
                    </div>
                    <div className="statCard">
                        <div className="statInf">
                            24/7
                        </div>
                        <div className="statSubTitle">
                            Поддержка
                        </div>
                    </div>
                    <div className="statCard">
                        <div className="statInf">
                            {'>'}90%
                        </div>
                        <div className="statSubTitle">
                            Довольных пользователей
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


function Line() {
    return (
        <div className="line"></div>
    )
}


export { Header, Main, Line };