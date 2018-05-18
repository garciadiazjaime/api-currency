import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'Application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  name: {
    doc: 'Application Name',
    format: String,
    default: 'api-currency',
    env: 'NAME',
  },
  version: {
    doc: 'Application Version',
    format: String,
    default: '1.0',
    env: 'VERSION',
  },
  port: {
    doc: 'Application Port.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
  ip: {
    doc: 'Application IP.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP',
  },
  dbUrl: {
    doc: 'Database URL',
    format: '*',
    default: 'mongodb://localhost:27017/currency',
    env: 'DB_URL',
  },
});

export default config;
