'use strict';

var polygon = require('turf-polygon');


// converts a warning polygon string to a GeoJSON polygon geometry
function polygonize (str, properties) {
  var coordinates = str.split(' ').map(function (pairStr) {
    return pairStr.split(',').reverse().map(Number);
  });

  return polygon([coordinates], properties);
}


module.exports = {
  polygonize: polygonize
};
