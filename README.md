Weather Alerts GeoJSON
======================

Streaming conversion of National Weather Service alerts to GeoJSON


Usage
=====


`geojson.stream()` is a through-stream that converts alerts into geojson
FeatureCollections. It is intended to be used downstream of
[weather-alerts-parser](https://github.com/TNRIS/weather-alerts-parser). Each
alert will be converted to a separate feature collection. The `stylize` option
will add [simple styles](https://github.com/mapbox/simplestyle-spec) based on
the official [NWS hazard map colors](http://www.weather.gov/help-map).

`geojson.collect()` will a convert a stream of alert FeatureCollections into a
single FeatureCollection where each feature (e.g. a specific county) contains
all the alerts that apply to it in the `properties` attribute. By default,
`properties` will be an array containing these alerts, but if `flatten` option
is set to `true`, then `properties` will be a JSON object containing the
alert properties. If there is only one alert, then those attributes will be
directly available on properties. If there is more than one alert, then
properties will contain an `alert-count` attribute and for each alert, the
alert properties will be prefixed with `alert-<N>-` where N is the index
(starting at 1) of the each alert's properties. Putting properties into a single
flat object is a little more standard and will probably be supported in more
tools/environs.


Here's an example that writes a GeoJSON FeatureCollection representing the
current alerts to stdout:

    var es = require('event-stream');
    var geojson = require('weather-alerts-geojson');
    var parser = require('weather-alerts-parser');
    var request = require('request');

    request.get('http://alerts.weather.gov/cap/us.php?x=1')
      .pipe(parser.stream())
      .pipe(geojson.stream({'stylize': true}))
      .pipe(geojson.collect({'sort': true, 'flatten': true}))
      .pipe(es.stringify())
      .pipe(process.stdout)
