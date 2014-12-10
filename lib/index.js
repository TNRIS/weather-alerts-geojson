'use strict';

var through = require('through');
var topojson = require('topojson');
var merge = require('lodash.merge');

var featureTransform = require('./feature-transform');
var stylize = require('./stylize');
var collector = require('./collector');

function decodeFeatures (featureCollection, codesStr, properties) {
  var features = [];

  if (featureCollection !== undefined && codesStr) {
    features = codesStr
        .split(' ')
        .map(function (code) {
          var feature = featureTransform.decodify(featureCollection, code, properties);
          if (feature === undefined) {
            console.warn('Could not find feature matching code "' + code + '". It will be omitted.');
          }
          return feature;
        })
        .filter(function(feature) {
          return feature !== undefined;
        });
  }

  return features;
}

function stream(opts) {
  opts = normalize(opts);
  var countyFeatureCollection = opts.counties;
  var zoneFeatureCollection = opts.zones;

  if (countyFeatureCollection === undefined) {
    var countyTopo = require('../data/us-counties-10m-topo');
    countyFeatureCollection = topojson.feature(countyTopo, countyTopo.objects.counties);
  }

  function write(alert) {
    var properties = alert;

    if (opts.stylize) {
      var style = stylize.style(alert);
      alert = merge(alert, style);
    }

    var features = [];

    if (alert.polygon) {
      features.push(featureTransform.polygonize(alert.polygon, properties));
    }

    if (alert.geocode) {
      var counties = decodeFeatures(countyFeatureCollection, alert.geocode.FIPS6, properties);
      features = features.concat(counties);

      var zones = decodeFeatures(zoneFeatureCollection, alert.geocode.FIPS6, properties);
      features = features.concat(zones);
    }

    var fc = {
      type: "FeatureCollection",
      features: features
    };

    this.queue(fc);
  }

  return through(write);
}

function normalize(opts) {
  var normalized = opts || {};

  if (normalized.stylize === undefined) {
    normalized.stylize = true;
  }

  return normalized;
}


module.exports = {
  stream: stream,
  collect: collector.collect,
};
