# Postcodes.io - NodeJS Client/Wrapper

[![Build Status](https://travis-ci.org/lcherone/node-postcodes.io.svg?branch=master)](https://travis-ci.org/lcherone/node-postcodes.io)

...

## Install

Install the package with npm:

``` bash
$ npm i node-postcodes.io
```

## Usage

```
const postcodes = require('node-postcodes.io')
```

### Lookup

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

``` javascript
let result = await postcodes.random()
```

### Validate

``` javascript
let result = await postcodes.validate('PO123AA')
```

### Nearest

``` javascript
let result = await postcodes.nearest('PO123AA')

// with optional params
let result = await postcodes.nearest('PO123AA', {
    radius: 1000,
    limit: 5
})
```

### Autocomplete

``` javascript
let result = await postcodes.autocomplete('PO123AA')

// with optional params
let result = await postcodes.autocomplete('PO123AA', {
    limit: 5
})
```

### Query

``` javascript
let result = await postcodes.query('PO123AA')

// with optional params
let result = await postcodes.query('PO123AA', {
    limit: 5
})
```

### Terminated

``` javascript
let result = await postcodes.terminated('PO123AA')
```

### Outcodes

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

### Place

``` javascript
// lookup
let result = await postcodes.place('osgb4000000074553605')

// query
let result = await postcodes.place('Ryde', true)

// random
let result = await postcodes.place()
```


## License

```
```