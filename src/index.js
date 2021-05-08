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
   * Lookup Postcode
   *
   * @link: http://postcodes.io/docs#Postcode-Lookup
   *
   * Usage:
   ``` javascript
    // single
    let result = await postcodes.lookup('PO123AA')

    // batch
    let result = await postcodes.lookup(['PO123AA', 'PO123AB'])

    // batch (with filter)
    let result = await postcodes.lookup(['PO123AA', 'PO123AB'], {
        filter: 'postcode,longitude,latitude'
    })
    ```
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
        const {
          data
        } = await axios({
          ...this.baseGetRequest,
          url: this.endpoint + '/postcodes/' + postcode,
          params: params
        })
        return data
      } else if (Array.isArray(postcode)) {
        debug('Lookup multi: ' + JSON.stringify(postcode), this.endpoint + '/postcodes', params)
        const {
          data
        } = await axios({
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
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Geo
   *
   * @link: http://postcodes.io/docs#Geocode-Postcode
   *
   * Usage:
   ``` javascript
    // single
    let result = await postcodes.geo(51.7923246977375,  0.629834723775309)

    // with optional params
    let result = await postcodes.geo(51.7923246977375,  0.629834723775309, {
        limit: 10,
        radius: 10,
        wideSearch: false
    })

    // batch
    let result = await postcodes.geo([
        {
            "longitude": 0.629834723775309,
            "latitude": 51.7923246977375,
            "radius": 1000,
            "limit": 5
        },{
            "longitude": -2.49690382054704,
            "latitude": 53.5351312861402,
            "radius": 1000,
            "limit": 5
        }
    ])

    // with optional params
    let result = await postcodes.geo([
        {
            "longitude": 0.629834723775309,
            "latitude": 51.7923246977375,
            "radius": 1000,
            "limit": 5
        },{
            "longitude": -2.49690382054704,
            "latitude": 53.5351312861402,
            "radius": 1000,
            "limit": 5
        }
    ], {
        filter: 'postcode,longitude,latitude',
        wideSearch: false
    })
    ```
   */
  async geo () {
    try {
      switch (arguments.length) {
        case 0:
        {
          return Promise.reject(
            new Error(
              'Invalid number of arguments'
            )
          )
        }
        case 1:
        {
          if (!Array.isArray(arguments[0])) {
            return Promise.reject(
              new Error(
                'Invalid argument, expecting (array) got (' + typeof arguments[0] + ')'
              )
            )
          }
          debug('Geo: ' + this.endpoint + '/postcodes', arguments)
          const {
            data
          } = await axios({
            ...this.basePostRequest,
            url: this.endpoint + '/postcodes',
            data: {
              geolocations: arguments[0]
            }
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
            debug('Geo: ' + this.endpoint + '/postcodes', arguments)
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/postcodes',
              params: {
                lat: arguments[0],
                lon: arguments[1]
              }
            })
            return data
          } else if (Array.isArray(arguments[0]) && typeof arguments[1] === 'object') {
            debug('Geo: ' + this.endpoint + '/postcodes', arguments)
            const {
              data
            } = await axios({
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
        }
        case 3:
        {
          if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && (typeof arguments[2] === 'object' && !Array.isArray(arguments[2]))) {
            debug('Geo: ' + this.endpoint + '/postcodes', arguments)
            const {
              data
            } = await axios({
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
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Random
   *
   * @link: http://postcodes.io/docs#Geocode-Postcode
   *
   * Usage:
   ``` javascript
    let result = await postcodes.random()
    ```
   */
  async random () {
    try {
      debug('Random: ' + this.endpoint + '/random/postcodes')
      const {
        data
      } = await axios({
        ...this.baseGetRequest,
        url: this.endpoint + '/random/postcodes'
      })
      return data
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Validate
   *
   * @link: http://postcodes.io/docs#Postcode-Validation
   *
   * Usage:
   ``` javascript
    let result = await postcodes.validate('PO123AA')
   ```
   */
  async validate () {
    try {
      if (typeof arguments[0] !== 'string') {
        return Promise.reject(
          new Error('Invalid argument expecting (string) got (' + typeof arguments[0] + ')')
        )
      }
      debug('Validate: ' + this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/validate', arguments)
      const {
        data
      } = await axios({
        ...this.baseGetRequest,
        url: this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/validate'
      })
      return data
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Nearest
   *
   * @link: http://postcodes.io/docs#Nearest-Postcode
   *
   * Usage:
   ``` javascript
    let result = await postcodes.nearest('PO123AA')

    // with optional params
    let result = await postcodes.nearest('PO123AA', {
      radius: 1000,
      limit: 5
    })
   ```
   */
  async nearest () {
    try {
      switch (arguments.length) {
        case 1:
        {
          if (typeof arguments[0] !== 'string') {
            return Promise.reject(
              new Error('Invalid argument expecting (string) got (' + typeof arguments[0] + ')')
            )
          }
          debug('Nearest: ' + this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/nearest')
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/nearest'
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'string' && typeof arguments[1] === 'object') {
            debug('Nearest: ' + this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/nearest', arguments)
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/nearest',
              params: arguments[1]
            })
            return data
          } else {
            return Promise.reject(
              new Error('Invalid argument expecting (string, object) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')')
            )
          }
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Autocomplete
   *
   * @link: http://postcodes.io/docs#Postcode-Autocomplete
   *
   * Usage:
   ``` javascript
    let result = await postcodes.autocomplete('PO123AA')

    // with optional params
    let result = await postcodes.autocomplete('PO123AA', {
        limit: 5
    })
   ```
   */
  async autocomplete () {
    try {
      switch (arguments.length) {
        case 1:
        {
          if (typeof arguments[0] !== 'string') {
            return Promise.reject(
              new Error('Invalid argument expecting (string) got (' + typeof arguments[0] + ')')
            )
          }
          debug('Autocomplete: ' + this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/autocomplete')
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/autocomplete'
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'string' && typeof arguments[1] === 'object') {
            debug('Autocomplete: ' + this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/autocomplete', arguments)
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/postcodes/' + encodeURIComponent(arguments[0]) + '/autocomplete',
              params: arguments[1]
            })
            return data
          } else {
            return Promise.reject(
              new Error('Invalid argument expecting (string, object) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')')
            )
          }
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Query
   *
   * @link: http://postcodes.io/docs#Postcode-Query
   *
   * Usage:
   ``` javascript
    let result = await postcodes.query('PO123AA')

    // with optional params
    let result = await postcodes.query('PO123AA', {
        limit: 5
    })
   ```
   */
  async query () {
    try {
      switch (arguments.length) {
        case 1:
        {
          if (typeof arguments[0] !== 'string') {
            return Promise.reject(
              new Error('Invalid argument expecting (string) got (' + typeof arguments[0] + ')')
            )
          }
          debug('Query: ' + this.endpoint + '/postcodes?q=' + encodeURIComponent(arguments[0]))
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/postcodes',
            params: {
              q: arguments[0]
            }
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'string' && typeof arguments[1] === 'object') {
            debug('Query: ' + this.endpoint + '/postcodes?q=' + encodeURIComponent(arguments[0]))
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/postcodes',
              params: {
                q: arguments[0],
                ...arguments[1]
              }
            })
            return data
          } else {
            return Promise.reject(
              new Error('Invalid argument expecting (string, object) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')')
            )
          }
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Terminated
   *
   * @link: http://postcodes.io/docs#Terminated
   *
   * Usage:
   ``` javascript
    let result = await postcodes.terminated('PO123AA')
   ```
   */
  async terminated () {
    try {
      if (typeof arguments[0] !== 'string') {
        return Promise.reject(
          new Error('Invalid argument expecting (string) got (' + typeof arguments[0] + ')')
        )
      }
      debug('Terminated postcode: ' + this.endpoint + '/terminated_postcodes/' + encodeURIComponent(arguments[0]))
      const {
        data
      } = await axios({
        ...this.baseGetRequest,
        url: this.endpoint + '/terminated_postcodes/' + encodeURIComponent(arguments[0])
      })
      return data
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Outcodes
   *
   * @link: http://postcodes.io/docs#Show-Outcode
   *
   * Usage:
   ``` javascript
    // lookup
    let result = await postcodes.outcodes('PO33')
    ```

    ``` javascript
    // nearest
    let result = await postcodes.outcodes('PO3', {
        limit: 10,
        radius: 10
    })
    ```

    ``` javascript
    // nearest (lat, lng)
    let result = await postcodes.outcodes(51.7923246977375,  0.629834723775309)

    // with optional params
    let result = await postcodes.outcodes(51.7923246977375,  0.629834723775309, {
        limit: 10,
        radius: 10
    })
   ```
   */
  async outcodes () {
    try {
      switch (arguments.length) {
        case 0:
        {
          return Promise.reject(
            new Error(
              'Invalid number of arguments'
            )
          )
        }
        case 1:
        {
          if (typeof arguments[0] !== 'string') {
            return Promise.reject(
              new Error(
                'Invalid argument, expecting (string) got (' + typeof arguments[0] + ')'
              )
            )
          }
          debug('Outcodes: ' + this.endpoint + '/outcodes/' + encodeURIComponent(arguments[0]))
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/outcodes/' + encodeURIComponent(arguments[0])
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'string' && (typeof arguments[1] === 'object' && !Array.isArray(arguments[1]))) {
            debug('Outcodes: ' + this.endpoint + '/outcodes/' + encodeURIComponent(arguments[0]), arguments[1])
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/outcodes/' + encodeURIComponent(arguments[0]) + '/nearest',
              params: arguments[1]
            })
            return data
          } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
            debug('Outcodes: ' + this.endpoint + '/outcodes?lat=' + encodeURIComponent(arguments[0]) + '?lat=' + encodeURIComponent(arguments[1]))
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/outcodes',
              params: {
                lat: arguments[0],
                lon: arguments[1]
              }
            })
            return data
          } else {
            return Promise.reject(
              new Error(
                'Invalid arguments, expecting ([string|number], [object|number]) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')'
              )
            )
          }
        }
        case 3:
        {
          if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number' && (typeof arguments[2] === 'object' && !Array.isArray(arguments[2]))) {
            debug('Outcodes: ' + this.endpoint + '/outcodes?lat=' + encodeURIComponent(arguments[0]) + '?lat=' + encodeURIComponent(arguments[1]), arguments[2])
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/outcodes',
              params: {
                lat: arguments[0],
                lon: arguments[1],
                ...arguments[2]
              }
            })
            return data
          } else {
            return Promise.reject(
              new Error(
                'Invalid arguments, expecting ([string|number], [object|number]) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')'
              )
            )
          }
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }

  /**
   * Places
   *
   * @link: http://postcodes.io/docs#Place-Lookup
   *
   * Usage:
   ``` javascript
    // lookup
    let result = await postcodes.places('osgb4000000074553605')

    // query
    let result = await postcodes.places('Ryde', {
        limit: 10
    })

    // random
    let result = await postcodes.places()
   ```
   */
  async places () {
    try {
      switch (arguments.length) {
        case 0:
        {
          debug('Places: ' + this.endpoint + '/random/places')
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/random/places'
          })
          return data
        }
        case 1:
        {
          if (typeof arguments[0] !== 'string') {
            return Promise.reject(
              new Error(
                'Invalid argument, expecting (string) got (' + typeof arguments[0] + ')'
              )
            )
          }
          debug('Places: ' + this.endpoint + '/places/' + encodeURIComponent(arguments[0]))
          const {
            data
          } = await axios({
            ...this.baseGetRequest,
            url: this.endpoint + '/places/' + encodeURIComponent(arguments[0])
          })
          return data
        }
        case 2:
        {
          if (typeof arguments[0] === 'string' && (typeof arguments[1] === 'object' && !Array.isArray(arguments[1]))) {
            debug('Places: ' + this.endpoint + '/places?q=' + arguments[0], arguments[1])
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/places',
              params: {
                q: arguments[0],
                ...arguments[1]
              }
            })
            return data
          } else if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
            debug('Outcodes: ' + this.endpoint + '/outcodes?lat=' + encodeURIComponent(arguments[0]) + '?lat=' + encodeURIComponent(arguments[1]))
            const {
              data
            } = await axios({
              ...this.baseGetRequest,
              url: this.endpoint + '/outcodes',
              params: {
                lat: arguments[0],
                lon: arguments[1]
              }
            })
            return data
          } else {
            return Promise.reject(
              new Error(
                'Invalid arguments, expecting ([string|number], [object|number]) got (' + typeof arguments[0] + ', ' + typeof arguments[1] + ')'
              )
            )
          }
        }
        default:
          return Promise.reject(
            new Error('Invalid number of arguments')
          )
      }
    } catch (e) {
      return Promise.resolve((e.response ? e.response.data : null) || {
        status: 500,
        error: 'Unknown error'
      })
    }
  }
}

module.exports = new PostcodesIO()
