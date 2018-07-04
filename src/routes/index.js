import express from 'express';
import graphqlHTTP from 'express-graphql';

import RateController from '../controllers/rateController';
// import UsdMxnController from '../controllers/usdmxnController';
// import AirbnbController from '../controllers/airbnbController';
import ratesSchema from '../graphql/schema/ratesSchema';


const router = express.Router();

router.get('/rates/v1', RateController.list);
router.post('/rates', RateController.save);

router.get('/rates', graphqlHTTP(() => ({
  schema: ratesSchema,
})));

// function routes(server) {


//   server.get('/rates', RateController.list);


//   server.get('/rates/usdmxn', UsdMxnController.list);
//   server.post('/rates/usdmxn', UsdMxnController.save);

//   server.get('/rates/airbnb', AirbnbController.list);
//   server.post('/rates/airbnb', AirbnbController.save);
// }

export default router;
