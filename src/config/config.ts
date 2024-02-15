import * as process from 'process';

export default () => ({
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  ATK_EXPIRES_IN: process.env.ATK_EXPIRES_IN,
  RTK_EXPIRES_IN: process.env.RTK_EXPIRES_IN,
});
