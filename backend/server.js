import express from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R43d55ha',
    database: 'ReactProject'
})

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