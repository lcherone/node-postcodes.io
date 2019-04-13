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
  }

  /**
   *
   */
  async lookup (postcode) {
    try {
      if (typeof postcode === 'string') {
        debug('Lookup: ' + postcode, this.endpoint + '/postcodes/' + postcode)
        let { data } = await axios({
          method: 'GET',
          url: this.endpoint + '/postcodes/' + postcode
        })
        return data
      } else if (Array.isArray(postcode)) {
        debug('Lookup multi: ' + JSON.stringify(postcode), this.endpoint + '/postcodes')
        let { data } = await await axios({
          method: 'POST',
          url: this.endpoint + '/postcodes',
          data: {
            postcodes: postcode
          },
          json: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return data
      } else {
        return Promise.reject(new Error('Argument must be string or array'))
      }
    } catch (e) {
      return Promise.resolve(e.response.data || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }
}

module.exports = new PostcodesIO()
