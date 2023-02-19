module.exports = {
  apps: [
    {
      name: 'nwa-api',
      script: 'dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: 'dist',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
