import * as process from 'process';

export default () => ({
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
});
