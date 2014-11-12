'use strict';
var test = require('tape');
var geojsonhint = require('geojsonhint');

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
