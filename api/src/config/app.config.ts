export default () => ({
  debug: process.env.APP_DEBUG === 'true',
  clientHost: process.env.CLIENT_HOST,
  mailer: process.env.MAILER_DSN,
});
