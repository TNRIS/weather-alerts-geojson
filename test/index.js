'use strict';
var fs = require('fs');
var path = require('path');

var geojsonhint = require('geojsonhint');
var test = require('tape');
var through = require('through');
var topojson = require('topojson');
var parser = require('weather-alerts-parser');

var find = require('lodash.find');

var geojsonStream = require('../lib/index.js')();

test('single.xml', function (t) {
  var filepath = path.join(__dirname, 'files/single.xml');
  var stream = fs.createReadStream(filepath).pipe(parser.stream()).pipe(geojsonStream);

  var countyTopo = require('../data/us-counties-10m-topo');
  var countyFeatureCollection = topojson.feature(countyTopo, countyTopo.objects.counties);

  stream.pipe(through(function (fc) {
    t.test('valid geojson', function(t2) {
      t2.plan(1);
      var errors = geojsonhint.hint(JSON.stringify(fc));
      t2.deepEqual(errors, []);
    });

    t.test('county features are populated', function(t2) {
      t2.plan(2);
      t2.equals(fc.features.length, 8);

      var expectedCounty = find(countyFeatureCollection.features, {id: '048025'});
      var foundCounty = fc.features[1];

      t2.deepEqual(expectedCounty.geometry, foundCounty.geometry);
    });
  }));
});
