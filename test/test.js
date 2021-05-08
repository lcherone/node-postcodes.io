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
  describe('lookup()', function () {
    it('valid postcode, expecting status 200', async () => {
      const result = await postcodes.lookup('PO123AA')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('invalid postcode, expecting status 404', async () => {
      const result = await postcodes.lookup('px3330')
      // debug(result)
      result.should.have.property('status', 404)
    })

    delay(1000)

    it('valid batch of postcodes (without filter), expecting status 200', async () => {
      const result = await postcodes.lookup(['PO123AA', 'PO123AB'])
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('valid batch of postcodes (with filter), expecting status 200', async () => {
      const result = await postcodes.lookup(['PO123AA', 'PO123AB'], {
        filter: 'postcode,longitude,latitude'
      })
      // debug(result)
      result.should.have.property('status', 200)
    })
  })

  /**
   * Geo
   */
  describe('geo()', function () {
    /**
     * Geo - Single
     */
    describe('single', function () {
      it('find (without filter), expecting status 200', async () => {
        const result = await postcodes.geo(51.7923246977375, 0.629834723775309)
        // debug(result)
        result.should.have.property('status', 200)
      })

      delay(1000)

      it('find (with filter), expecting status 200', async () => {
        const result = await postcodes.geo(51.7923246977375, 0.629834723775309, {
          limit: 10,
          radius: 10,
          wideSearch: false
        })
        // debug(result)
        result.should.have.property('status', 200)
      })

      delay(1000)
    })

    /**
     * Geo - Batch
     */
    describe('batch', function () {
      it('find (without filter), expecting status 200', async () => {
        const result = await postcodes.geo([{
          longitude: 0.629834723775309,
          latitude: 51.7923246977375,
          radius: 100,
          limit: 2
        }, {
          longitude: -2.49690382054704,
          latitude: 53.5351312861402,
          radius: 100,
          limit: 2
        }])
        // debug(result)
        result.should.have.property('status', 200)
      })

      delay(1000)

      it('find (with filter), expecting status 200', async () => {
        const result = await postcodes.geo([{
          longitude: 0.629834723775309,
          latitude: 51.7923246977375,
          radius: 100,
          limit: 2
        }, {
          longitude: -2.49690382054704,
          latitude: 53.5351312861402,
          radius: 100,
          limit: 2
        }], {
          filter: 'postcode,longitude,latitude',
          wideSearch: false
        })
        // debug(result)
        result.should.have.property('status', 200)
      })

      delay(1000)
    })
  })

  /**
   * random
   */
  describe('random()', function () {
    it('expecting status 200', async () => {
      const result = await postcodes.random()
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)
  })

  /**
   * validate
   */
  describe('validate()', function () {
    it('valid, expecting status 200, result true', async () => {
      const result = await postcodes.validate('PO123AA')
      // debug(result)
      result.should.have.property('status', 200)
      result.should.have.property('result', true)
    })

    delay(1000)

    it('invalid, expecting status 200, result false', async () => {
      const result = await postcodes.validate('ZO123AA')
      // debug(result)
      result.should.have.property('status', 200)
      result.should.have.property('result', false)
    })

    delay(1000)
  })

  /**
   * nearest
   */
  describe('nearest()', function () {
    it('find (without filter), expecting status 200', async () => {
      const result = await postcodes.nearest('PO123AA')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('find, expecting status 200', async () => {
      const result = await postcodes.nearest('PO123AA', {
        radius: 1000,
        limit: 5
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)
  })

  /**
   * autocomplete
   */
  describe('autocomplete()', function () {
    it('find (without filter), expecting status 200', async () => {
      const result = await postcodes.autocomplete('PO123AA')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('find, expecting status 200', async () => {
      const result = await postcodes.autocomplete('PO123AA', {
        radius: 1000,
        limit: 5
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)
  })

  /**
   * query
   */
  describe('query()', function () {
    it('find (without filter), expecting status 200', async () => {
      const result = await postcodes.query('PO123AA')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('find, expecting status 200', async () => {
      const result = await postcodes.query('PO12', {
        radius: 1000,
        limit: 5
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)
  })

  /**
   * terminated
   */
  describe('terminated()', function () {
    it('find valid, expecting status 404', async () => {
      const result = await postcodes.terminated('PO123AA')
      // debug(result)
      result.should.have.property('status', 404)
      result.should.have.property('error', 'Terminated postcode not found')
    })

    delay(1000)
  })

  /**
   * terminated
   */
  describe('terminated()', function () {
    it('find valid, expecting status 404', async () => {
      const result = await postcodes.terminated('PO123AA')
      // debug(result)
      result.should.have.property('status', 404)
      result.should.have.property('error', 'Terminated postcode not found')
    })

    delay(1000)
  })

  /**
   * outcodes
   */
  describe('outcodes()', function () {
    it('find, expecting status 200', async () => {
      const result = await postcodes.outcodes('PO33')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('find, expecting status 200', async () => {
      const result = await postcodes.outcodes('PO3', {
        limit: 25,
        radius: 5000
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('find, expecting status 200', async () => {
      const result = await postcodes.outcodes(50.7887094404762, -1.08621057142857, {
        limit: 1,
        radius: 5000
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)
  })

  /**
   * places
   */
  describe('places()', function () {
    it('lookup, expecting status 200', async () => {
      const result = await postcodes.places('osgb4000000074553605')
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('query, expecting status 200', async () => {
      const result = await postcodes.places('Ryde', {
        limit: 1
      })
      // debug(result)
      result.should.have.property('status', 200)
    })

    delay(1000)

    it('random, expecting status 200', async () => {
      const result = await postcodes.places()
      // debug(result)
      result.should.have.property('status', 200)
    })
  })
})
