'use strict';

var clone = require('clone');
var find = require('lodash.find');
var through = require('through');


function mergeFeatureCollections(first, second) {
  second.features.forEach(function (feature) {
    var newFeature = clone(feature);
    var existingFeature = find(first.features, {id: feature.id});

    if (existingFeature === undefined) {
      newFeature.properties = [newFeature.properties];
      first.features.push(newFeature);
    } else {
      existingFeature.properties.push(newFeature.properties);
    }
  });

  return first;
}

function collect() {
  var collected = {
    "type": "FeatureCollection",
    "features": []
  };

  var stream = through(function write(fc) {
    collected = mergeFeatureCollections(collected, fc);
  }, function end() {
    this.queue(collected);
    this.emit('end');
  });

  return stream;
}

module.exports = {
  collect: collect
};
