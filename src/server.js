import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors'

import config from './config';
import routes from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.listen(config.get('port'), config.get('ip'), () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.get('dbUrl'));

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log(`Express Running ${config.get('ip')}:${config.get('port')}`);
    app.use('/', routes);
  });
});
