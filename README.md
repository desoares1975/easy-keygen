# Easy-keygen
Easy to use, multiplataform ssh-keygen for Node.JS
To work on Windows GitBash must be installed and the right bin folder must be available on the PATH
environment variable.

## Requirements
  - ES2015

## Usage
```sh
$ npm install easy-keygen
```

```js
const keygen = require('easy-keygen');
keygen()
.then(keys => {
  console.log(keys.privateKey, keys.publicKey);
})
.catch(e => console.log(e));
/*
  Will return something like beneth:
 -----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA3dTa07ltbtGjy0E31fNuvJAzSZXArgQVuAOlIN+/z8z9d54b
v8LqcfT36x5TtLVpcNom0PLF3KLbvsk707HzcpIBXcfJc0/Wqb7EfrwcIlfC8f97
2N/5FhUMXOgSWXNkDtKpevQ3yQmuUlDvp3gaJ9e/ZVNExYydRm/W5Rg17NOXP/xL
LPhcdAko/VlwOACI14E1N8mZmO+/NxAJiTAVH1bHVKbnN+MOIETrYTrWoMJ6zSM9
j5lzFz/C7/EQIH2/0qRMLeFSzgUN4Sr3TCZ61L0ab2ceAesXjN28fuoAOuBRpq15
3KY268bWV57OXrHS554mYFO0OYUYAIVutn5v8QIDAQABAoIBAFl24fYnv4HFHLj5
iYpJDi0QPw77TWUhEp1PIwa6FoK5GrRmWKyi8Kia8m2ponqr+2VfJe55KuFL8THl
uLIs/5ECX3ix/YX6+gklfdvbA8G6AU5WCl2yHqKIlxcpJVVcG0t7HI0Q93ql498g
8zZoUqwk7/Tuezrs9fUVX+avN/hVsP1ia4Pe4RGLSt2TAWPxo12ObO18SdBmfX6g
eo30r/JuqaOiTCpLvJlqBCyfcHTQOwaI7XenfEddKE1im80Avh4UtY0UwR4H5ye5
1mA1gsfMEb1NK9s9RvO0w8ba3msUzFw+s8dG6gq7hrhh5jNtw9bcKiPrXzYZs254
2TwR3cECgYEA/dJrpI5RS1kNV5NV+i8yVW6WiZ2tj5FQkVlJ+U7NylVXf0xuL9cb
8jfG6wAPaqUI1xO92O2d5x9fioB1Fza7n8jz/8kYvfRRxOXcMIFjG6ce1XPO5dQ+
Bn/2Vtt5aRaSxKmFj8hgAahr385n+RtKWgcelwTLRMUIrY9zqqRS9XkCgYEA37wo
4V6n8uRVgypcbHI2qqqsma87UhztWkIMkCa1zWNzKzlqUXXfuxbox4xIsN/fVmMR
nNehrzcyMWENuCizIXQikpjPxCgsPyeFxTZ8yv7KMrjLPdwht9OsqK0XEFQW7ewD
BY60ArUsyZOK7+e6+BdZB9rxJ58/rpQDJzaqCDkCgYAx2E63RBOG3ngWSKLLvNT/
nfYGFGbvGLRfts8mHGmhYF0MbK/+yRl92aJAqARfBwXTZtcTcKZfqvOSOWPFKURz
Pn1cL9uiAgbEyfcRt3cFCS6u8E0jKSj9EcgIipUvI/WylS/bapgf+zkj/F7Ctq9F
OryxH4njeWYY32Dxk8+O0QKBgQDeCq4DpN5HR2a6awMYuW0ZiZMMXwUfZAgHSH+R
XGmXcbht0Gh8eeBVm9HfoJDPwQ60fFORdctHyh6tNOXZu8KzU7+v/6pKwZfQAZhX
9dB54c2n8w/5z4tDFfdH26iFEv9ClrUVAeASw920HBKKL0+2Qe2gxyAIM5qO1uQe
ObkbuQKBgG+TU8G75eFqgxt+062uAhtgGy/mcl8GQOKLBKGWm5lsZUu7uwqMJj5L
/vfevM5muIOoYsTVvBISJRO01XKOtmXqot1kq96UdNDgFZ6fi9jM9/oLspTvNJ7U
qXnYJbO1/Gf7XqSi9haYVvxOajo/IyweK/gVMkLyyHq2zVWl414S
-----END RSA PRIVATE KEY-----
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDd1NrTuW1u0aPLQTfV8268kDNJlcCuBBW4A6Ug37/PzP13nhu/wupx9PfrHlO0tWlw2ibQ5sXcotu+yTvTsfNyfgFdx8lzT9apvsR+vBwiV8Lx/3vY3/kWFQxc6BJZc2QO0ql69DfJCa5SUO+neBon179lU0TFjJ1Gb9blGDXs05c//Ess+Fx0CSj9WXA4AIjXgTU3yZmY778zEAmJMBUfVsdUpuc34w4gROertagwnrNIz2PmXMXP8Lv8RAgfb/SpEwt4VLOBQ3hKvdMJnrUvRpvZx4B6xeM3bx+6gA64FGmrXncpjbrxtZXns5esdLnniZgU7Q5hRgAhW62fm/x someuser@Somecomputer-1234-123
*/
```
With no arguments the key pair will no be persisted, to save the key pair you need to pass a path like beneth:
```js
const keygen = require('easy-keygen');
const fs = require('fs');

keygen(`${__dirname}/cert`)
.then(keys => {
  console.log(keys.privateKey, keys.publicKey);
})
.catch(e => console.log(e));
/**
  - This wil have the same result as the aobe, but the certificates will be saved as cert, and cert.pub
*/
```
Warning: If the path for your cetificates are the same of any other files with the same name they will be erased unless you set options.prevent = true. In this case there will be an error.

## Options
You cam pass an object with one to four options
 - Authentication type: {'type': 'rsa'}. Is the type of authentivation on the certificate
 that will be generated. The default is RSA. (refere to ssh-keygen -? or [Choosing_the_authentication_key_type](https://wiki.archlinux.org/index.php/SSH_keys#Choosing_the_authentication_key_type)
 for more information on SSH keys authentication types.)
 - Passphrase: {'passphrase': 'secret phrase goes here'}. Is the passprase. It will be required for future decription if set.
 - SSH key size: {'size': 1024}. Sets the size, in bits, of the key pair genareated, the bigger the size longer the it will take to genarate the key pair. (A long key pair with 9216 may take over 5 seconds, depending on the sistema resources.)
 - Prevent rewrite: {'prevent': true}. Will prevent the re-write of the file with the same name as the end of the path option.
 (The script may freeze case there is an file with the same name.)

## Testing
```sh
$ npm test
/**
 the dev dependencies must be installed.
*/
```