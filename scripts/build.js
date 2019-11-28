const fs = require('fs');

const app = process.env.appname;
const dir = __dirname.replace('scripts', '');
console.log(`==============🌌${app}-${dir}🌌==============`);

const template = `import Main from './Apps/${app}';\nexport default Main;`;
fs.writeFile(`${dir}/src/App.js`, template, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saveddd
  console.log('app saved!🙌');
});
