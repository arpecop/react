const env = {
  development: {
    api: 'https://rudixauth.herokuapp.com/test/',
  },
  production: {
    api: 'https://rudixauth.herokuapp.com/test/',
  },
};

module.exports = { env: env[process.env.NODE_ENV] };
