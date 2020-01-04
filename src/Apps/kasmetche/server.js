const watch = require('node-watch');
const request = require('request');

watch('/Users/arpecop/Desktop/react/src/Apps/kasmetche', { recursive: true }, (evt, name) => {
  console.log('%s changed.', name);
});
