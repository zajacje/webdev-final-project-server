import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import SessionController from './session-controller.js';
import UsersController from './users/users-controller.js';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://localhost:27017/wecook'
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // TODO: change this to frontend env
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // needs HTTPS
}))
app.use(express.json());
app.get('/', (req, res) => {res.send('Welcome to the meal plan server!')});
SessionController(app);
UsersController(app);
app.listen(4000);