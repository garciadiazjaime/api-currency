import errors from 'restify-errors';
import Rate from '../models/rate';

function list(req, res, next) {
  Rate.apiQuery(req.params, (err, docs) => {
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

  const { data } = req.body || [];

  if (!data || !data.length) {
    return next(new errors.InvalidContentError('no data sent'));
  }

  const promises = data.map((item) => {
    const entity = new Rate({
      currency: item.currency,
      rate: item.rate,
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
