module.exports = {
  apps: [
    {
      name: 'ghost-reader-server',
      script: 'dist/server.js',
      instances: 'max',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
