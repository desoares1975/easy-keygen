'use strict';

const keygen = require('../'),
      chai = require('chai'),
      fs = require('fs');

chai.use(require('chai-as-promised'));

after(done => {
  fs.unlink(`${__dirname}/opts-certs`, err => {
    if (err) {
      console.log(err);
    }
      fs.unlink(`${__dirname}/opts-certs.pub`, err => {
      if (err) {
        console.log(err);
      }

      fs.unlink(`${__dirname}/certs`, err => {
        if (err) {
            console.log(err);
          }
            fs.unlink(`${__dirname}/certs.pub`, err => {
              if (err) {
                console.log(err);
              }
              fs.unlink(`${__dirname}/buffer-certs`, err => {
                if (err) {
                  console.log(err);
                }
                fs.unlink(`${__dirname}/buffer-certs.pub`, err => {
                  if (err) {
                    console.log(err);
                  }
                });
              });
            });
        });
      });
  });
  done();
});

describe('Keygen', () => {
  it('keygen should be a function', done => {
    chai.expect(keygen).to.be.a('function');
    done();
  });
  it('keygen should return an key pair, without any argument', done => {
    let keys = keygen();
    chai.expect(keys).to.eventually.be.a('object');
    chai.expect(keys).to.eventually.have.property('privateKey');
    chai.expect(keys).to.eventually.have.property('publicKey');
    keys.then(keys => {
      chai.expect(keys.privateKey).to.be.a('string');
      chai.expect(keys.publicKey).to.be.a('string');
      chai.expect(keys.privateKey.indexOf('-----BEGIN RSA PRIVATE KEY-----')).to.equal(0);
      chai.expect(keys.publicKey.indexOf('ssh-rsa ')).to.equal(0);
      chai.expect(keys.privateKey.length).to.be.gt(1000);
      done();
    });
  });
  it('keygen should return an key pair, with path argument', done => {
    let keys = keygen(`${__dirname}/certs`);
    chai.expect(keys).to.eventually.be.a('object');
    chai.expect(keys).to.eventually.have.property('privateKey');
    chai.expect(keys).to.eventually.have.property('publicKey');
    keys.then(keys => {
      chai.expect(keys.privateKey).to.be.a('string');
      chai.expect(keys.publicKey).to.be.a('string');
      chai.expect(keys.privateKey.indexOf('-----BEGIN RSA PRIVATE KEY-----')).to.equal(0);
      chai.expect(keys.publicKey.indexOf('ssh-rsa ')).to.equal(0);
      chai.expect(keys.privateKey.length).to.be.gt(1000);
      fs.readFile(`${__dirname}/certs`, (err, data) => {
        chai.expect(err).to.equal(null);
        chai.expect(data.toString()).to.be.a('string');
        fs.readFile(`${__dirname}/certs.pub`, (err, data) => {
          chai.expect(err).to.equal(null);
          chai.expect(data.toString()).to.be.a('string');
          done();
        });
      });
    });

  });
  it('keygen should return an key pair, with all arguments', done => {
    let keys = keygen(`${__dirname}/opts-certs`, {'type': 'rsa', 'passphrase': 'no one can find this out', 'size': 1024});
    chai.expect(keys).to.eventually.be.a('object');
    chai.expect(keys).to.eventually.have.property('privateKey');
    chai.expect(keys).to.eventually.have.property('publicKey');
    keys.then(keys => {
      chai.expect(keys.privateKey).to.be.a('string');
      chai.expect(keys.publicKey).to.be.a('string');
      chai.expect(keys.privateKey.indexOf('Proc-Type: 4,ENCRYPTED')).to.equal(32);
      chai.expect(keys.privateKey.indexOf('-----BEGIN RSA PRIVATE KEY-----')).to.equal(0);
      chai.expect(keys.privateKey.length).to.be.lt(1000);
      chai.expect(keys.publicKey.indexOf('ssh-rsa ')).to.equal(0);
      done();
    });
  });
  it('keygen should return an key pair, in buffer format', done => {
    let keys = keygen(`${__dirname}/buffer-certs`, {'buffer': true});
    chai.expect(keys).to.eventually.be.a('object');
    chai.expect(keys).to.eventually.have.property('privateKey');
    chai.expect(keys).to.eventually.have.property('publicKey');
    keys.then(keys => {
      chai.expect(keys.privateKey).to.be.instanceof(Buffer);
      chai.expect(keys.privateKey).to.not.be.a('string');
      chai.expect(keys.publicKey).to.be.instanceof(Buffer);
      chai.expect(keys.privateKey.indexOf('-----BEGIN RSA PRIVATE KEY-----')).to.equal(0);
      chai.expect(keys.publicKey.indexOf('ssh-rsa ')).to.equal(0);
      done();
    });
  });
});