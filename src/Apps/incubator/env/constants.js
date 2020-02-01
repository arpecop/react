const env = {
  development: {
    api: 'https://db.arpecop.xyz/',
  },
  production: {
    api: 'https://db.arpecop.xyz/',
  },
};

module.exports = { env: env[process.env.NODE_ENV] };
