import RateController from '../controllers/rateController';
import UsdMxnController from '../controllers/usdmxnController';
import AirbnbController from '../controllers/airbnbController';

function routes(server) {
  server.get('/rates', RateController.list);
  server.post('/rates', RateController.save);

  server.get('/rates/usdmxn', UsdMxnController.list);
  server.post('/rates/usdmxn', UsdMxnController.save);

  server.get('/rates/airbnb', AirbnbController.list);
  server.post('/rates/airbnb', AirbnbController.save);
}

export default routes;
