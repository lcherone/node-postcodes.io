process.env.DEBUG = 'node-postcodes.io:*'

/* eslint-disable */
//
const debug = require('debug')('node-postcodes.io:tests')
const assert = require('assert')
const should = require('should')
//
const postcodes = require('../src/index.js')
//
const delay = interval => {
  return it('💕 sleeping for ' + interval / 1000 + 's', done => {
    setTimeout(done, interval)
  }).timeout(interval + 100)
}
/* eslint-enable */

/**
 * Tests
 */

describe('node-postcodes.io', function () {
  describe('lookup', function () {
    it('valid postcode, expecting status 200', async () => {
      var result = await postcodes.lookup('PO123AA')
      // debug(result)

      result.should.have.property('status', 200)
    })

    delay(2500)

    it('invalid postcode, expecting status 404', async () => {
      var result = await postcodes.lookup('px3330')
      // debug(result)

      result.should.have.property('status', 404)
    })

    delay(2500)

    it('valid batch of postcodes, expecting status 200', async () => {
      var result = await postcodes.lookup(['PO123AA', 'PO123AB'])
      // debug(result)

      result.should.have.property('status', 200)
    })
  })
})
