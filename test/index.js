'use strict';
var fs = require('fs');
var path = require('path');

var test = require('tape');
var through = require('through');
var parser = require('weather-alerts-parser');

var converter = require('../lib/index.js')();

test('single', function (t) {
  t.plan(2);

  var filepath = path.join(__dirname, 'files/single.xml');
  var readable = fs.createReadStream(filepath);

  var stream = readable.pipe(parser.stream()).pipe(converter);

  stream.pipe(through(function (fc) {
    t.equals(fc.type, "FeatureCollection");
    t.equals(fc.features.length, 8);
  }));

});
