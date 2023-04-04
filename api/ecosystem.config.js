module.exports = {
  apps: [
    {
      name: 'shifter-shop-api',
      script: 'dist/src/main.js',
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
