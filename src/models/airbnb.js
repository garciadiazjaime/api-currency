import mongoose from 'mongoose';
import mongooseStringQuery from 'mongoose-string-query';
import timestamps from 'mongoose-timestamp';

const AirbnbSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: Number,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  pictures: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  rateType: {
    type: String,
    required: true,
  },
}, {
  minimize: false,
});

AirbnbSchema.plugin(timestamps);
AirbnbSchema.plugin(mongooseStringQuery);

const Airbnb = mongoose.model('airbnb', AirbnbSchema);

export default Airbnb;
