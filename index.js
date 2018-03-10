'use strict';

const Bluebird = require('bluebird'),
      os = require('os'),
      { join } = require('path'),
      exec = Bluebird.promisify(require('child_process').exec),
      { unlink } = require('fs'),
      readFile = Bluebird.promisify(require('fs').readFile);

module.exports = Bluebird.promisify((path, options, cb) => {
  let deleteCerts = false;

  cb = cb || options || path;

  if (!cb || typeof cb !== 'function') {
    throw new Error('Callback is not a function.');
  }
  if (Array.isArray(options)) {
    return cb(new Error('Options must be an object or falsy.'));
  }
  if (typeof path !== 'string') {
    path = join(os.tmpdir(), (+new Date()).toString());
    deleteCerts = true;
  }
  
  options = (typeof options === 'object' ? options : {'type': 'rsa', 'passphrase': ''});
  options.type = options.type ? options.type : 'rsa';
  options.passphrase = options.passphrase ? options.passphrase : '';

  let strOptions = ` -f ${path}`,
      privateKey,
      publicKey;

  for (let option in options) {
    switch (option) {
      case 'type': strOptions += ` -t ${options[option]}`; break;
      case 'passphrase': strOptions += ` -N "${options[option]}"`; break;
      case 'size': strOptions += ` -b ${options[option]}`; break;
    }
  }

  if (os.platform() === 'win32') {
    path = path.replace(new RegExp(/\//, 'g'), '\\');
  }

  if (!options.prevent) {
    unlink(path, () => {});
    unlink(`${path}.pub`, () => {});
  }

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

    return cb(null, {privateKey, publicKey});
  })
  .catch(e => cb(e));
});