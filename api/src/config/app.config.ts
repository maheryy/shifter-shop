export default () => ({
  debug: process.env.APP_DEBUG === 'true',
  clientUrl: process.env.CLIENT_URL,
  mailer: process.env.MAILER_DSN,
});
