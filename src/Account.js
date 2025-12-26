import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {

                // Mock data for demo
                const mockUser = {
                    id: 1,
                    login: 'egor_user',
                    fio: 'Егор Иванов'
                };

                const mockApplications = [
                    { id: 101, description: 'Парковка на тротуаре', status: 'open', createdAt: '2025-12-20' },
                    { id: 102, description: 'Проезд на красный', status: 'close', createdAt: '2025-12-22' },
                    { id: 103, description: 'Остановка в неположенном месте', status: 'close', createdAt: '2025-12-24' }
                ];

                setUser(mockUser);
                setApplications(mockApplications);
            } catch (err) {
                setError('Не удалось загрузить данные');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    const handleLogout = () => {

        localStorage.removeItem('authToken');
        navigate('/login');
    };

    // Get status label with color
    const getStatusLabel = (status) => {
        const labels = {
            open: 'открыто',
            close: 'закрыто'
        };
        return labels[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            open: '#ff0000ff',
            close: '#0dff00ff'
        };
        return colors[status] || '#9e9e9e';
    };

    if (loading) {
        return <div className="account-page">Загрузка...</div>;
    }

    if (error) {
        return (
            <div className="account-page">
                <p className="error-message">{error}</p>
                <button onClick={() => window.location.reload()}>Повторить</button>
            </div>
        );
    }

    return (
        <div className="account-page">
            <div className="account-header">
                <h1>Личный кабинет</h1>
                <p className="welcome-message">Добро пожаловать, <strong>{user.login}</strong>!</p>
                <button onClick={handleLogout} className="logout-button">
                    Выйти
                </button>
            </div>

            <div className="applications-section">
                <h2>Ваши заявления ({applications.length})</h2>

                {applications.length === 0 ? (
                    <p className="no-applications">У вас пока нет поданных заявлений.</p>
                ) : (
                    <div className="applications-list">
                        {applications.map((app) => (
                            <div key={app.id} className="application-card">
                                <div className="app-description">{app.description}</div>
                                <div className="app-meta">
                                    <span className="app-date">{app.createdAt}</span>
                                    <span
                                        className="app-status"
                                        style={{ color: getStatusColor(app.status) }}
                                    >
                                        {getStatusLabel(app.status)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;