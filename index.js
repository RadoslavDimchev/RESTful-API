const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');


const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/furniture';

start();

async function start() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(CONNECTION_STRING);
  console.log('Database connected');

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: 'REST Service operational' });
  });

  app.listen(3030, () => console.log('REST Service started'));
}