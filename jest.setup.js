'use strict';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

// const { Local } = require('browserstack-local');
// const browserStackLocal = new Local();
// const localBrowserStackOpts = {
//   key: process.env.BROWSERSTACK_ACCESS_KEY,
//   localIdentifier: new Date().getTime(), // Adding a unique local identifier to run parallel tests on BrowserStack
// };

// global.browserStackLocal = browserStackLocal;

// module.exports = () => {
//   return new Promise((resolve, reject) => {
//     browserStackLocal.start(localBrowserStackOpts, err => {
//       if (err) return reject(err);
//       resolve();
//     });
//   });
// };
