import errors from 'restify-errors';
import Airbnb from '../models/airbnb';

function list(req, res, next) {
  Airbnb.apiQuery(req.params, (err, docs) => {
    if (err) {
      return next(new errors.InvalidContentError(err.errors.name.message));
    }

    res.send(docs);
    return next();
  });
}

function save(req, res, next) {
  if (!req.is('application/json')) {
    return next(new errors.InvalidContentError("Expects 'application/json'"));
  }

  const { data } = req.body || {};
  if (!data || !data.length) {
    return next(new errors.InvalidContentError('no data sent'));
  }

  const promises = data.map((item) => {
    const entity = new Airbnb({
      id: item.id,
      bathrooms: item.bathrooms,
      bedrooms: item.bedrooms,
      city: item.city,
      lat: item.lat,
      lng: item.lng,
      title: item.title,
      pictures: item.pictures,
      rating: item.rating,
      userId: item.userId,
      price: item.price,
      currency: item.currency,
      rateType: item.rateType,
    });
    return entity.save();
  });

  return Promise.all(promises).then((results) => {
    res.send(results);
    next();
  });
}

export default {
  list,
  save,
};
