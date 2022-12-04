import express from 'express';

const app = express()
app.get('/', (req, res) => {res.send('Welcome to the meal plan server!')})
app.listen(4000)