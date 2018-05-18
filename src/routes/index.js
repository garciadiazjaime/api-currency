import RateController from '../controllers/rateController';
import UsdMxnController from '../controllers/usdmxnController';

function routes(server) {
  server.get('/rates', RateController.list);
  server.post('/rates', RateController.save);

  server.get('/rates/usdmxn', UsdMxnController.list);
  server.post('/rates/usdmxn', UsdMxnController.save);
}

export default routes;
