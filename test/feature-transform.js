'use strict';
var geojsonhint = require('geojsonhint');
var test = require('tape');

var featureTransform = require('../lib/feature-transform.js');

test('features.polygonize', function (t) {
  var properties = {
    'name': 'test alert',
    'test': 1,
    'nested': {
      'ness': 'lucas',
      'arryay': [2, 10.230, 20]
    }
  };

  var str = '29.75,-101.76 29.82,-101.76 29.82,-101.46 29.62,-101.22 29.54,-101.28 29.73,-101.47 29.75,-101.76';

  var expected = {
    'coordinates': [[
      [-101.76, 29.75],
      [-101.76, 29.82],
      [-101.46, 29.82],
      [-101.22, 29.62],
      [-101.28, 29.54],
      [-101.47, 29.73],
      [-101.76, 29.75]
    ]]
  };

  var polygon = featureTransform.polygonize(str, properties);

  t.test('polygon contains all properties', function (t2) {
    t2.plan(1);
    t2.deepEqual(polygon.properties, properties);
  });

  t.test('polygon coordinates are correct', function (t2) {
    t2.plan(1);
    t2.deepEqual(polygon.geometry.coordinates, expected.coordinates);
  });

  t.test('polygon is valid GeoJSON', function (t2) {
    t2.plan(1);
    var errors = geojsonhint.hint(JSON.stringify(polygon));
    t2.deepEqual(errors, []);
  });
});


test('features.decodify', function (t) {
  var test1 = {
    "id": "test1",
    "type": "Feature",
    "properties": {
      "size": 5000
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -108.28125,
            38.20365531807149
          ],
          [
            -105.99609375,
            34.30714385628804
          ],
          [
            -101.77734374999999,
            37.23032838760387
          ],
          [
            -108.28125,
            38.20365531807149
          ]
        ]
      ]
    }
  };

  var test2 = {
    "type": "Feature",
    "id": "test2",
    "properties": {
      "size": 200
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -98.4375,
            35.817813158696616
          ],
          [
            -97.6025390625,
            33.797408767572485
          ],
          [
            -94.1748046875,
            32.99023555965106
          ],
          [
            -90.7470703125,
            37.37015718405753
          ],
          [
            -94.9658203125,
            38.06539235133249
          ],
          [
            -98.4375,
            35.817813158696616
          ]
        ]
      ]
    }
  };

  var testFeature3 = {
    "type": "Feature",
    "id": "test3",
    "properties": {
      "size": 300
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -100.45898437499999,
            43.96119063892024
          ],
          [
            -89.2529296875,
            38.376115424036016
          ],
          [
            -94.9658203125,
            44.902577996288876
          ],
          [
            -97.03125,
            45.336701909968106
          ],
          [
            -100.45898437499999,
            43.96119063892024
          ]
        ]
      ]
    }
  };

  var featureCollection = {
    "type": "FeatureCollection",
    "features": [test1, test2]
  };

  var properties = {
    'name': 'test alert',
    'test': 1,
    'nested': {
      'ness': 'lucas',
      'arryay': [2, 10.230, 20]
    }
  };


  var decoded = featureTransform.decodify(featureCollection, 'test2', properties);

  t.test('decoded feature properties match passed properties', function (t2) {
    t2.plan(1);
    t2.deepEqual(decoded.properties, properties);
  });

  t.test('the correct decoded feature is pulled from featureCollection', function (t2) {
    t2.plan(1);
    t2.deepEqual(decoded.geometry, test2.geometry);
  });

  t.test('decoded feature is valid GeoJSON', function (t2) {
    t2.plan(1);
    var errors = geojsonhint.hint(JSON.stringify(decoded));
    t2.deepEqual(errors, []);
  });
});
