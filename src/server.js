import restify from 'restify';
import restifyPlugins from 'restify-plugins';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config';
import routes from './routes';

const server = restify.createServer({
  name: config.get('name'),
  version: config.get('version'),
});

server.use(restifyPlugins.jsonBodyParser({
  mapParams: true,
}));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({
  mapParams: true,
}));
server.use(restifyPlugins.fullResponse());
server.use(morgan('tiny'));

server.listen(config.get('port'), () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.get('dbUrl'));

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    routes(server);
    console.log('%s listening at %s', server.name, server.url);
  });
});
