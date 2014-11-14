'use strict';

var assign = require('lodash.assign');
var clone = require('clone');
var find = require('lodash.find');
var through = require('through');

var stylize = require('./stylize');


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

function flattenProperties(featureCollection, preserveStyle) {
  var newFeatureCollection = clone(featureCollection);

  newFeatureCollection.features.forEach(function (feature) {
    if (feature.properties.length === 1) {
      feature.properties = feature.properties[0];
    } else {
      var properties = {
        'alert-count': feature.properties.length
      };
      feature.properties = assign(properties, flattenObjectArray(feature.properties, preserveStyle));
    }
  });

  return newFeatureCollection;
}

function flattenObjectArray(arr, promoteStyle) {
  var flattened = {};


  if (promoteStyle) {
    stylize.attributes.forEach(function(attr) {
      flattened[attr] = arr[0][attr];
    });
  }

  arr.forEach(function (obj, i) {
    Object.keys(obj).forEach(function (key) {
      var prefix = 'alert-' + String(i +1) + '-';
      var flatKey = prefix + String(key) ;

      if (promoteStyle) {
        if (stylize.attributes.indexOf(key) !== -1) {
          return;
        }
      }
      flattened[flatKey] = obj[key];
    });
  });


  return flattened;
}

function sortProperties(featureCollection) {
  var newFeatureCollection = clone(featureCollection);

  var compare = sorter();

  newFeatureCollection.features.forEach(function (feature) {
    feature.properties.sort(compare);
  });

  return newFeatureCollection;
}

function sorter() {
  var orders = {
    'severity': [
      'Extreme',
      'Severe',
      'Moderate',
      'Minor',
      'Unknown'
    ],
    'urgency': [
      'Immediate',
      'Expected',
      'Future',
      'Past',
      'Unknown'
    ],
    'certainty': [
      'Observed',
      'Very Likely',
      'Likely',
      'Possible',
      'Unlikely'
    ]
  };


  return function compare(a, b) {
    var keyOrders = [
      'severity',
      'urgency',
      'certainty'
    ];

    for (var i = 0, len = keyOrders.length; i < len; i++) {
      var name = keyOrders[i];
      var diff = compareByArray(a, b, name, orders);
      if (diff !== 0) {
        return diff;
      }
    }

    return 0;
  };
}

function compareByArray(a, b, name, orders) {
  var array = orders[name];
  var aIndex = array.indexOf(a[name]);
  var bIndex = array.indexOf(b[name]);

  if (aIndex === -1) {
    aIndex = array.length;
  }
  if (bIndex === -1) {
    bIndex = array.length;
  }

  return aIndex - bIndex;
}


function collect(opts) {
  opts = opts || {};

  var collected = {
    "type": "FeatureCollection",
    "features": []
  };

  var stream = through(function write(fc) {
      collected = mergeFeatureCollections(collected, fc);
    }, function end() {
      if (opts.sort) {
        collected = sortProperties(collected);
      }
      if (opts.flatten) {
        collected = flattenProperties(collected, true);
      }
      if (opts.stringify) {
       collected = JSON.stringify(collected);
      }
      this.queue(collected);
      this.emit('end');
    });

  return stream;
}

module.exports = {
  collect: collect
};
