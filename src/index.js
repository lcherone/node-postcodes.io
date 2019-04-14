'use strict'

/*
 +----------------------------------------------------------------------+
 | node-postcodes.io
 +----------------------------------------------------------------------+
 | Copyright (c)2019 (https://github.com/lcherone/node-postcodes.io)
 +----------------------------------------------------------------------+
 | This source file is subject to MIT License
 | that is bundled with this package in the file LICENSE.
 |
 | If you did not receive a copy of the license and are unable to
 | obtain it through the world-wide-web, please send an email
 | to lawrence@cherone.co.uk so we can send you a copy immediately.
 +----------------------------------------------------------------------+
 | Authors:
 |   Lawrence Cherone <lawrence@cherone.co.uk>
 +----------------------------------------------------------------------+
 */

const debug = require('debug')('node-postcodes.io:lib')
const axios = require('axios')

/**
 *
 */
class PostcodesIO {
  /**
   *
   */
  constructor () {
    this.endpoint = 'https://api.postcodes.io'

    this.baseRequest = {
      params: {},
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    this.baseGetRequest = {
      method: 'GET',
      ...this.baseRequest
    }

    this.basePostRequest = {
      method: 'POST',
      data: {},
      ...this.baseRequest
    }
  }

  /**
   *
   */
  async lookup () {
    let postcode
    let params = {}

    switch (arguments.length) {
      case 1:
        postcode = arguments[0]
        break
      case 2:
        postcode = arguments[0]
        params = arguments[1]
        break
      default:
        return Promise.reject(
          new Error('Invalid number of arguments')
        )
    }

    try {
      if (typeof postcode === 'string') {
        debug('Lookup: ' + postcode, this.endpoint + '/postcodes/' + postcode, params)
        let {
          data
        } = await axios({
          ...this.baseGetRequest,
          url: this.endpoint + '/postcodes/' + postcode,
          params: params
        })
        return data
      } else if (Array.isArray(postcode)) {
        debug('Lookup multi: ' + JSON.stringify(postcode), this.endpoint + '/postcodes', params)
        let {
          data
        } = await await axios({
          ...this.basePostRequest,
          url: this.endpoint + '/postcodes',
          params: params,
          data: {
            postcodes: postcode
          }
        })
        return data
      } else {
        return Promise.reject(
          new Error('Argument must be string or array')
        )
      }
    } catch (e) {
      return Promise.resolve(e.response.data || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   *
   */
  async geo () {
    /* eslint-disable */
    let params = {}
    /* eslint-enable */

    switch (arguments.length) {
      case 0:
        return Promise.reject(
          new Error(
            'Invalid number of arguments'
          )
        )
      case 1:
        if (!Array.isArray(arguments[0])) {
          return Promise.reject(
            new Error(
              'Invalid argument, expecting (array) got (' + typeof arguments[0] + ')'
            )
          )
        }
        let {
          data
        } = await await axios({
          ...this.basePostRequest,
          url: this.endpoint + '/postcodes',
          params: params,
          data: {
            geolocations: arguments[0]
          }
        })
        return data
      case 2:
        if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
          let {
            data
          } = await await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/postcodes',
            params: {
              lat: arguments[0],
              lon: arguments[1]
            }
          })
          return data
        } else if (Array.isArray(arguments[0]) && typeof arguments[1] === 'object') {
          let {
            data
          } = await await axios({
            ...this.basePostRequest,
            url: this.endpoint + '/postcodes',
            params: arguments[1],
            data: {
              geolocations: arguments[0]
            }
          })
          return data
        } else {
          return Promise.reject(
            new Error(
              'Invalid arguments, expecting (array, object) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')'
            )
          )
        }
      case 3:
        if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && (typeof arguments[2] === 'object' && !Array.isArray(arguments[2]))) {
          let {
            data
          } = await await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/postcodes',
            params: {
              lat: arguments[0],
              lon: arguments[1]
            }
          })
          return data
        } else {
          return Promise.reject(
            new Error(
              'Invalid arguments, expecting (number, number, object)' +
              ' got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ', ' + (Array.isArray(arguments[2]) ? 'array' : typeof arguments[2]) + ')'
            )
          )
        }
      default:
        return Promise.reject(
          new Error('Invalid number of arguments')
        )
    }
  }

  /**
   *
   */
  async random () {

  }

  /**
   *
   */
  async validate () {

  }

  /**
   *
   */
  async nearest () {

  }

  /**
   *
   */
  async autocomplete () {

  }

  /**
   *
   */
  async query () {

  }

  /**
   *
   */
  async terminated () {

  }

  /**
   *
   */
  async outcodes () {

  }

  /**
   *
   */
  async place () {

  }
}

module.exports = new PostcodesIO()
