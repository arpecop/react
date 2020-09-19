const fs = require('fs');

const app = process.env.appname;
const dir = __dirname.replace('scripts', '');
const assets = require(`${dir}/build/asset-manifest.json`);
console.log('==========', assets, '========');
