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
  /**
   * Lookup
   */
  /*
  describe('lookup()', function () {
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

    it('valid batch of postcodes (without filter), expecting status 200', async () => {
      var result = await postcodes.lookup(['PO123AA', 'PO123AB'])
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(2500)

    it('valid batch of postcodes (with filter), expecting status 200', async () => {
      var result = await postcodes.lookup(['PO123AA', 'PO123AB'], {
        filter: 'postcode,longitude,latitude'
      })
      //debug(result)
      result.should.have.property('status', 200)
    })
  })
  */

  /**
   * Geo
   */
  describe('geo()', function () {
    // describe('single', function () {
    // it('find (without filter), expecting status 200', async () => {
    //   let result = await postcodes.geo(51.7923246977375, 0.629834723775309)
    //   debug(result)
    //   result.should.have.property('status', 200)
    // })

    // delay(2500)

    // it('find (with filter), expecting status 200', async () => {
    //   let result = await postcodes.geo(51.7923246977375, 0.629834723775309, {
    //     limit: 10,
    //     radius: 10,
    //     wideSearch: false
    //   })
    //   debug(result)
    //   result.should.have.property('status', 200)
    // })

    // delay(2500)
    // })

    describe('batch', function () {
      // it('find (without filter), expecting status 200', async () => {
      //   let result = await postcodes.geo([{
      //     'longitude': 0.629834723775309,
      //     'latitude': 51.7923246977375,
      //     'radius': 1000,
      //     'limit': 5
      //   }, {
      //     'longitude': -2.49690382054704,
      //     'latitude': 53.5351312861402,
      //     'radius': 1000,
      //     'limit': 5
      //   }])
      //   debug(result)
      //   result.should.have.property('status', 200)
      // })

      // delay(2500)

      // it('find (with filter), expecting status 200', async () => {
      //   let result = await postcodes.geo([{
      //     'longitude': 0.629834723775309,
      //     'latitude': 51.7923246977375,
      //     'radius': 1000,
      //     'limit': 5
      //   }, {
      //     'longitude': -2.49690382054704,
      //     'latitude': 53.5351312861402,
      //     'radius': 1000,
      //     'limit': 5
      //   }], {
      //     filter: 'postcode,longitude,latitude',
      //     wideSearch: false
      //   })
      //   debug(result)
      //   result.should.have.property('status', 200)
      // })

      // delay(2500)
    })
  })

  // /**
  //  * random
  //  */
  // describe('random()', function () {
  //   it('find (without filter), expecting status 200', async () => {
  //     let result = await postcodes.random()
  //     debug(result)
  //     result.should.have.property('status', 200)
  //   })

  //   delay(2500)
  // })

  // /**
  //  * validate
  //  */
  // describe('validate()', function () {
  //   // it('valid, expecting status 200, result true', async () => {
  //   //   let result = await postcodes.validate('po333jf')
  //   //   debug(result)
  //   //   result.should.have.property('status', 200)
  //   //   result.should.have.property('result', true)
  //   // })

  //   // delay(2500)

  //   it('invalid, expecting status 200, result false', async () => {
  //     let result = await postcodes.validate('po33f')
  //     debug(result)
  //     result.should.have.property('status', 200)
  //     result.should.have.property('result', false)
  //   })

  //   delay(2500)
  // })

  // /**
  //  * nearest
  //  */
  // describe('nearest()', function () {
  //   // it('find (without filter), expecting status 200', async () => {
  //   //   let result = await postcodes.nearest('PO123AA')
  //   //   debug(result)
  //   //   result.should.have.property('status', 200)
  //   // })

  //   // delay(2500)

  //   it('find, expecting status 200', async () => {
  //     let result = await postcodes.nearest('PO123AA', {
  //       radius: 1000,
  //       limit: 5
  //     })
  //     debug(result)
  //     result.should.have.property('status', 200)
  //   })

  //   delay(2500)
  // })

  // /**
  //  * autocomplete
  //  */
  // describe('autocomplete()', function () {
  //   // it('find (without filter), expecting status 200', async () => {
  //   //   let result = await postcodes.autocomplete('PO123AA')
  //   //   debug(result)
  //   //   result.should.have.property('status', 200)
  //   // })

  //   // delay(2500)

  //   it('find, expecting status 200', async () => {
  //     let result = await postcodes.autocomplete('PO123AA', {
  //       radius: 1000,
  //       limit: 5
  //     })
  //     debug(result)
  //     result.should.have.property('status', 200)
  //   })

  //   delay(2500)
  // })

  // /**
  //  * query
  //  */
  // describe('query()', function () {
  //   // it('find (without filter), expecting status 200', async () => {
  //   //   let result = await postcodes.query('PO123AA')
  //   //   debug(result)
  //   //   result.should.have.property('status', 200)
  //   // })

  //   // delay(2500)

  //   it('find, expecting status 200', async () => {
  //     let result = await postcodes.query('PO12', {
  //       radius: 1000,
  //       limit: 5
  //     })
  //     debug(result)
  //     result.should.have.property('status', 200)
  //   })

  //   delay(2500)
  // })

  // /**
  //  * terminated
  //  */
  // describe('terminated()', function () {
  //   it('find valid, expecting status 404', async () => {
  //     let result = await postcodes.terminated('PO123AA')
  //     debug(result)
  //     result.should.have.property('status', 404)
  //     result.should.have.property('error', 'Terminated postcode not found')
  //   })

  //   delay(2500)
  // })
  
  /**
   * terminated
   */
  describe('terminated()', function () {
    it('find valid, expecting status 404', async () => {
      let result = await postcodes.terminated('PO123AA')
      debug(result)
      result.should.have.property('status', 404)
      result.should.have.property('error', 'Terminated postcode not found')
    })

    delay(2500)
  })
})
