const express = require('express');
const mongoose = require('mongoose');

const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const cors = require('./middlewares/cors');
const session = require('./middlewares/session');
const trimBody = require('./middlewares/trimBody');


const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/furniture';

start();

async function start() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(CONNECTION_STRING);
  console.log('Database connected');

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());

  app.get('/', (req, res) => {
    res.json({ message: 'REST Service operational' });
  });

  app.use('/users', authController);
  app.use('/data/catalog', dataController);

  app.listen(3030, () => console.log('REST Service started'));
}