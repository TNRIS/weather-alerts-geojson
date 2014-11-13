'use strict';
var fs = require('fs');

var request = require('request');
var parser = require('weather-alerts-parser');
var through = require('through');

var geojson = require('../lib/index.js');


request.get('http://alerts.weather.gov/cap/us.php?x=1')
  .pipe(parser.stream())
  .pipe(geojson.stream({'stylize': true}))
  .pipe(geojson.collect({'sort': true, 'flatten': true}))
  .pipe(through(function (obj) {this.queue(JSON.stringify(obj));}))
  .pipe(fs.createWriteStream('current-nws-alerts.json'));
