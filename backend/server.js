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

