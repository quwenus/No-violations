import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R43d55ha',
    database: 'ReactProject'
}).promise();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.json(err)
        return res.json(results)
    })
})


db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL database!');
});


app.post('/register', async (req, res) => {
    const { fio, email, login, password } = req.body;

    if (!fio || !email || !login || !password) {
        return res.status(400).json({ error: "Все поля должны быть заполнены" })
    }

    const sql = `INSERT INTO users (fio, email, login, password) VALUES (?, ?, ?, ?)`;
    const values = [fio.trim(), email.trim(), login.trim(), password.trim()];

    try {
        const result = await db.query(sql, values);
        return res.status(201).json({ message: 'Пользователь создан' })
    } catch (err) {
        console.error('Ошибка регистрации:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Email или логин уже заняты" });
        }

        return res.status(500).json({ error: "Ошибка сервера" });
    }
})


app.listen(3000, () => console.log('Сервер запущен'));