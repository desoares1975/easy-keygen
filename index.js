'use strict';

const Bluebird = require('bluebird'),
      os = require('os'),
      { join } = require('path'),
      exec = Bluebird.promisifyAll(require('child_process').exec),
      { unlink } = require('fs'),
      readFile = Bluebird.promisifyAll(require('fs').readFile);

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


  let strOptions,
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

  unlink(path, () => {});
  unlink(`${path}.pub`, () => {});

  exec(`ssh-keygen ${strOptions}`)
  .then((stdout, stderr) => {
    if (stderr) {
      return cb(new Error(stderr));
    }

    return readFile(path);
  })
  .then(data => {
    privateKey = data.toString('utf-8');

    return readFile(`${path}.pub`);
  })
  .then(data => {
    publicKey = data.toString('utf-8');
  })
  .then(() => {
    if (deleteCerts) {
      unlink(path, () => {});
      unlink(`${path}.pub`, () => {});
    }
  })
  .then(() => {
    return cb(null, {privateKey, publicKey});
  })
  .catch(e => cb(e));
});