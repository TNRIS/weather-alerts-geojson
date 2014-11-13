'use strict';
var fs = require('fs');
var path = require('path');

var geojsonhint = require('geojsonhint');
var test = require('tape');
var through = require('through');
var topojson = require('topojson');
var parser = require('weather-alerts-parser');

var find = require('lodash.find');

var geojson = require('../lib/index.js');

test('single.xml', function (t) {
  var filepath = path.join(__dirname, 'files/single.xml');
  var countyTopo = require('../data/us-counties-10m-topo');
  var countyFeatureCollection = topojson.feature(countyTopo, countyTopo.objects.counties);

  fs.createReadStream(filepath)
    .pipe(parser.stream())
    .pipe(geojson.stream())
    .pipe(through(function (fc) {
      t.test('valid geojson', function(t2) {
        t2.plan(1);
        t2.deepEqual(geojsonhint.hint(JSON.stringify(fc)), []);
      });

      t.test('county features are populated', function(t2) {
        t2.plan(3);
        t2.equals(fc.features.length, 8);

        var expectedCounty = find(countyFeatureCollection.features, {id: '048025'});
        var foundCounty = fc.features[1];

        t2.notEqual(expectedCounty.geometry, undefined);
        t2.deepEqual(expectedCounty.geometry, foundCounty.geometry);
      });
    }));
});


test('stylize option', function (t) {
  var filepath = path.join(__dirname, 'files/single.xml');

  t.test('simple styles are added when stylize is truthy', function(t2) {
    t2.plan(1);

    fs.createReadStream(filepath).pipe(parser.stream())
      .pipe(geojson.stream({'stylize': true}))
      .pipe(through(function (fc) {
        var feature = fc.features[0];
        t2.equal(feature.properties.fill, '#2E8B57');
      }));
  });

  t.test('simple styles are not added when stylize is falsey', function(t2) {
    t2.plan(1);

    fs.createReadStream(filepath).pipe(parser.stream())
      .pipe(geojson.stream({'stylize': false}))
      .pipe(through(function (fc) {
        var feature = fc.features[0];
        t2.equal(feature.properties.fill, undefined);
      }));
  });
});
