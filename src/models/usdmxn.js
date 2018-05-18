import mongoose from 'mongoose';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

const UsdMxnSchema = new mongoose.Schema({
  entity: {
    type: String,
    required: true,
  },
  buy: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
  },
}, {
  minimize: false,
});

UsdMxnSchema.plugin(timestamps);
UsdMxnSchema.plugin(mongooseStringQuery);

const UsdMxn = mongoose.model('Usdmxn', UsdMxnSchema);

export default UsdMxn;
