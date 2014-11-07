'use strict';
var fs = require('fs');
var path = require('path');
var test = require('tape');
var parser = require('weather-alerts-parser');

var converter = require('../index.js');

test('polygon', function (t) {
  t.plan(1);

  var filepath = path.join(__dirname, 'files/single.xml');
  var readable = fs.createReadStream(filepath);

  readable.pipe(parser).pipe(converter);

  parser.parse(readable, function (error, parsed) {
    t.equals(parsed.length, 39);
  });
});
