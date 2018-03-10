'use strict';

const Bluebird = require('bluebird'),
      os = require('os'),
      { join } = require('path'),
      exec = Bluebird.promisify(require('child_process').exec),
      { unlink } = require('fs'),
      readFile = Bluebird.promisify(require('fs').readFile);

module.exports = Bluebird.promisify((path, options, cb) => {
  let deleteCerts;

  if (!path) {
    path = join(os.tmpdir(), (+new Date()).toString());
    deleteCerts = true;
  }
  if (!cb && typeof options === 'function') {
    cb = options;
    options = {
      'type': 'rsa',
      'passPhrase': ''
    };
  }

  if (!cb) {
    throw new Error('Callback is not a function.');
  }


  let strOptions = '',
      privateKey,
      publicKey;

  for (let option in options) {
    switch (option) {
      case 'type': strOptions += ` -t ${options[option]}`; break;
      case 'passPhrase': strOptions += ` -N "${options[option]}"`; break;
      case 'size': strOptions += ` -b ${options[option]}`; break;
    }
  }

  
  if (os.platform() === 'win32') {
    path = path.replace(new RegExp(/\//, 'g'), '\\');
  }
console.log(path, 'PATH')
  unlink(path, () => {});
  unlink(`${path}.pub`, () => {});

  exec(`ssh-keygen ${strOptions}`)
  .then((stdout, stderr) => {
    if (stderr) {
      return cb(new Error(stderr));
    }
console.log('11111111');
    return readFile(path);
  })
  .then(data => {
    privateKey = data.toString('utf-8');
console.log('222222222222222');
    return readFile(`${path}.pub`);
  })
  .then(data => {
console.log('333333333333333333');
    publicKey = data.toString('utf-8');
  })
  .then(() => {
console.log('44444444444444444444444');
    if (deleteCerts) {
      unlink(path, () => {});
      unlink(`${path}.pub`, () => {});
    }
console.log('55555555555555555555555555555');
    return cb(null, {privateKey, publicKey});
  })
  .catch(e => cb(e));
});