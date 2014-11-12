// script that converts counties topo output by us-atlas project commonJS module
// with integer FIPS codes converted to 6-digit zero-padded codes (FIPS6)
'use strict';
var fs = require('fs');

var minimist = require('minimist');
var topojson = require('topojson');
var zeroFill = require('zero-fill');


var argv = minimist(process.argv.slice(2));
var inpath = argv._[0];
var outpath = argv._[1];

fs.readFile(inpath, function(err, data) {
  var prepend = "module.exports = ";

  var regex = /(\"id\":)(\d+)/g;

  var str = data.toString();

  var replaced = str.replace(regex, function (match, p1, p2) {
    var stringified = '"' + zeroFill(Number(p2), 6) + '"';
    return p1 + stringified;
  });

  var output = prepend + replaced;

  fs.writeFile(outpath, output);
});
