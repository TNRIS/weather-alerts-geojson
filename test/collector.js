'use strict';
var _ = require('lodash');
var es = require('event-stream');
var test = require('tape');
var through = require('through');

var geojsonhint = require('geojsonhint');

var collector = require('../lib/collector.js');
var fixtures = require('./fixtures');

test('collector.collect', function (t) {
  var replacementFeatures = _.cloneDeep(fixtures.featureCollection.features);

  replacementFeatures[0].properties.size = 1000;
  replacementFeatures[2].id = "feature4";
  replacementFeatures[2].properties.size = 400;
  
  var featureCollections = [
    fixtures.featureCollection,
    _.extend(_.clone(fixtures.featureCollection), {features: replacementFeatures})
  ];

  var expectedProperties = [
    ['feature1', [{size: 5000}, {size: 1000}]],
    ['feature2', [{size: 200}, {size: 200}]],
    ['feature3', [{size: 300}]],
    ['feature4', [{size: 400}]]
  ];

  es.readArray(featureCollections)
    .pipe(collector.collect())
    .pipe(through(function (fc) {
      t.test('valid geojson', function(t2) {
        t2.plan(1);
        t2.deepEqual(geojsonhint.hint(JSON.stringify(fc)), []);
      });
      t.test('properties are merged as expected', function(t2) {
        t2.plan(8);
        expectedProperties.forEach(function (expected, i) {
          var id = expected[0];
          var properties = expected[1];
          t2.deepEqual(fc.features[i].id, id);
          t2.deepEqual(fc.features[i].properties, properties);
        });
      });
    }));
});
