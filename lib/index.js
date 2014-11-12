'use strict';

var through = require('through');

var featureTransform = require('./feature-transform');

function converter() {
  function write(alert) {
    var alertProperties = {};

    var features = [];

    if (alert.polygon) {
      features.push(featureTransform.polygonize(alert.polygon, alertProperties));
    }

    if (alert.geocode) {
      var FIPS6 = alert.geocode.FIPS6;

      if (FIPS6) {
        var FIPS6codes = FIPS6.split(' ');
        features = features.concat(FIPS6codes);
      }

      var UGC = alert.geocode.UGC;
      if (UGC) {
        var UGCcodes = UGC.split(' ');
        features = features.concat(UGCcodes);
      }
    }

    var fc = {
      type: "FeatureCollection",
      features: features
    };

    this.queue(fc);
  }

  return through(write);
}

module.exports = converter;
