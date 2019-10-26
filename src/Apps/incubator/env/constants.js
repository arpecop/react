const env = {
  development: {
    api: 'http://gigi.local:5984/',
  },
  production: {
    api: 'https://rudixauth.herokuapp.com/',
  },
};

module.exports = { env: env[process.env.NODE_ENV] };
