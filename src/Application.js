import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RUSSIAN_PLATE_CHARS = 'АВЕКМНОРСТУХ';

function Application() {
    const [plate, setPlate] = useState('');
    const navigate = useNavigate();

    const handlePlateChange = (e) => {
        let value = e.target.value.toUpperCase();

        // Remove all invalid characters
        let cleaned = '';
        for (let char of value) {
            if (RUSSIAN_PLATE_CHARS.includes(char)) {
                cleaned += char;
            } else if (/\d/.test(char)) {
                cleaned += char;
            }
            // Skip spaces, symbols, Latin letters, etc.
        }

        // Auto-format as user types: А777АА77 → А777АА 77
        let formatted = '';
        if (cleaned.length > 0) formatted = cleaned[0]; // letter
        if (cleaned.length > 1) formatted += cleaned.slice(1, 4); // 3 digits
        if (cleaned.length > 4) formatted += cleaned.slice(4, 6); // 2 letters
        if (cleaned.length > 6) {
            formatted = formatted.slice(0, 6) + ' ' + cleaned.slice(6, 8); // space + region
        }

        // Max length: 9 (А777АА 77)
        if (formatted.length > 10) {
            formatted = formatted.substring(0, 10);
        }

        setPlate(formatted);
    };

    const navigateBack = () => {
        navigate('/');
    };

    const [description, setDescription] = useState('');
    const MAX_LENGTH = 500;

    // Validation (optional)
    const isDescriptionValid = description.trim().length >= 10;

    // Handler
    const handleDescriptionChange = (e) => {
        if (e.target.value.length <= MAX_LENGTH) {
            setDescription(e.target.value);
        }
    };

    return (
        <div className="application-wrapper">
            <div className="application-header">
                <h1 id="application-title">Подача заявления</h1>
            </div>
            <div className="application-main">
                <div className="application-form">
                    <form className="applicationForm">
                        <div className="inputGroup">
                            <label htmlFor="plate" className="inputLabel">Номер автомобиля</label>
                            <input
                                type="text"
                                id="plate"
                                className="input"
                                value={plate}
                                onChange={handlePlateChange}
                                placeholder="А777АА 777"
                                maxLength="10"
                                inputMode="text" // or "none" to prevent mobile keyboard suggestions
                            />
                            {/* Optional: show validation error */}
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="description" className="inputLabel">
                                Описание нарушения *
                            </label>
                            <textarea
                                id="description"
                                className="input input--textarea"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Опишите нарушение: где, когда, что произошло. Пример: «Автомобиль ВАЗ-2110 с номером А123ВС777 припаркован на тротуаре у дома 15 на улице Ленина»"
                                minLength="10"
                                required
                            />
                            <div className="char-count">
                                {description.length}/{MAX_LENGTH}
                            </div>
                            {!isDescriptionValid && description && (
                                <p className="error-text">Минимум 10 символов</p>
                            )}
                        </div>
                    </form>
                    <div className='applicationbtn'>
                        <button  className='application'>Подать заявление</button>
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

export default Application;