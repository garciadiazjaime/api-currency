import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import RateModel from '../../models/rate';

const ratesType = new GraphQLObjectType({
  name: 'rates',
  description: 'rates',
  fields: () => ({
    _id: {
      type: GraphQLString,
      description: '_id',
    },
    currency: {
      type: GraphQLString,
      description: 'currency',
    },
    rate: {
      type: GraphQLString,
      description: 'rate',
    },
    type: {
      type: GraphQLString,
      description: 'type',
    },
    createdAt: {
      type: GraphQLString,
      description: 'createdAt',
    },
  }),
});

const rateSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      rate: {
        type: new GraphQLList(ratesType),
        args: {
          currency: {
            name: 'currency',
            type: GraphQLString,
          },
        },
        resolve: (root, { currency }) => new Promise((resolve, reject) => {
          const query = currency ? { currency } : {};
          RateModel.find(query, (error, rate) => (error ? reject(error) : resolve(rate))).sort('-createdAt').sort('rate').limit(8);
        }),
      },
    },
  }),
});

export default rateSchema;
