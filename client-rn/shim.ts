if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

if (typeof TextEncoder === 'undefined') global.TextEncoder = require('text-encoding-shim').TextEncoder
if (typeof TextDecoder === 'undefined') global.TextDecoder = require('text-encoding-shim').TextDecoder

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
// require('crypto')

import { base64ToBytes, bytesToBase64 } from "did-jwt/lib/util"

if (!global.btoa) {
    global.btoa = bytesToBase64;
}

if (!global.atob) {
    global.atob = base64ToBytes;
}

/*
Note: @verida/datastore had the following code, but
I have replaced to use the did-jwt encoding libaries above

(Chris - 25 Aug '21)

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
*/