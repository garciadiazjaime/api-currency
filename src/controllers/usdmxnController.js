import errors from 'restify-errors';
import UsdMxn from '../models/usdmxn';

function list(req, res, next) {
  UsdMxn.apiQuery(req.params, (err, docs) => {
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
    const entity = new UsdMxn({
      entity: item.entity,
      buy: item.buy,
      sale: item.sale,
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
