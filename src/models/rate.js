import mongoose from 'mongoose';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

const RateSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
}, {
  minimize: false,
});

RateSchema.plugin(timestamps);
RateSchema.plugin(mongooseStringQuery);

const Rate = mongoose.model('Rate', RateSchema);

export default Rate;
