# Postcodes.io - NodeJS Client/Wrapper

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard) [![NPM](https://nodei.co/npm/node-postcodes.io.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-postcodes.io/)
[![Build Status](https://travis-ci.org/lcherone/node-postcodes.io.svg?branch=master)](https://travis-ci.org/lcherone/node-postcodes.io)


An easy to use [postcodes.io](http://postcodes.io/) wrapper for NodeJS.

## :arrow_forward: Install

Install the package with npm:

``` bash
$ npm i node-postcodes.io
```

## :clipboard: Usage

``` javascript
const postcodes = require('node-postcodes.io')
```

### Lookup

http://postcodes.io/docs#Postcode-Lookup

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

### Geo

http://postcodes.io/docs#Geocode-Postcode

#### Single

``` javascript
//
let result = await postcodes.geo(51.7923246977375,  0.629834723775309)

// with optional params
let result = await postcodes.geo(51.7923246977375,  0.629834723775309, {
    limit: 10,
    radius: 10,
    wideSearch: false
})
```

#### Batch

``` javascript
//
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

### Random

http://postcodes.io/docs#Geocode-Postcode

``` javascript
let result = await postcodes.random()
```

### Validate

http://postcodes.io/docs#Postcode-Validation

``` javascript
let result = await postcodes.validate('PO123AA')
```

### Nearest

http://postcodes.io/docs#Nearest-Postcode

``` javascript
let result = await postcodes.nearest('PO123AA')

// with optional params
let result = await postcodes.nearest('PO123AA', {
    radius: 1000,
    limit: 5
})
```

### Autocomplete

http://postcodes.io/docs#Postcode-Autocomplete

``` javascript
let result = await postcodes.autocomplete('PO123AA')

// with optional params
let result = await postcodes.autocomplete('PO123AA', {
    limit: 5
})
```

### Query

http://postcodes.io/docs#Postcode-Query

``` javascript
let result = await postcodes.query('PO123AA')

// with optional params
let result = await postcodes.query('PO123AA', {
    limit: 5
})
```

### Terminated

http://postcodes.io/docs#Terminated

``` javascript
let result = await postcodes.terminated('PO123AA')
```

### Outcodes

http://postcodes.io/docs#Show-Outcode

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

### Places

http://postcodes.io/docs#Place-Lookup

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

## :lock: Testing

Can see test results @ https://travis-ci.org/lcherone/node-postcodes.io, if you want to run them locally, your need install [mocha](https://mochajs.org), then run:

``` bash
$ npm test
```

## :copyright: License

The MIT License (MIT). Please see [License File](https://github.com/lcherone/node-postcodes.io/blob/master/LICENSE) for more information.
