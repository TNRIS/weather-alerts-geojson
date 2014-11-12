'use strict';

var polygon = require('turf-polygon');
var find = require('lodash.find');


// converts an alert polygon string to a GeoJSON polygon geometry
function polygonize (str, properties) {
  var coordinates = str.split(' ').map(function (pairStr) {
    return pairStr.split(',').reverse().map(Number);
  });

  return polygon([coordinates], properties);
}


// pulls feature from featureCollection with ID matching code, and creates a
// new feature from that geometry with properties substituted in
function decodify (featureCollection, code, properties) {
  var feature = find(featureCollection.features, {'id': code});

  if (feature) {
    feature.properties = properties;
  }

  return feature;
}

module.exports = {
  decodify: decodify,
  polygonize: polygonize
};
