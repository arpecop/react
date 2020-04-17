const env = {
  development: {
    api: 'https://socket.arpecop.xyz/test/',
  },
  production: {
    api: 'https://socket.arpecop.xyz/test/',
  },
};

module.exports = { env: env[process.env.NODE_ENV] };
