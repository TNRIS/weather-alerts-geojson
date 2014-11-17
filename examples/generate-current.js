'use strict';
var es = require('event-stream');
var fs = require('fs');
var parser = require('weather-alerts-parser');
var request = require('request');
var through = require('through');

var geojson = require('../lib/index.js');


function cleanProperties() {
  var remove = [
    'geocode',
    'parameter',
    'polygon'
  ];

  return through(function write(featureCollection) {
    featureCollection.features.forEach(function(feature) {
      remove.forEach(function(remove) {
        delete feature.properties[remove];
      });
    });

    this.queue(featureCollection);
  });
}

request.get('http://alerts.weather.gov/cap/us.php?x=1')
  .pipe(parser.stream())
  .pipe(geojson.stream({'stylize': true}))
  .pipe(cleanProperties())
  .pipe(geojson.collect({'sort': true, 'flatten': true}))
  .pipe(es.stringify())
  .pipe(process.stdout);
