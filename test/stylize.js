'use strict';

var test = require('tape');

var stylize = require('../lib/stylize.js');

test('stylize', function (t) {

  var testAlert = {
    event: 'Flash Flood Watch',
    summary: '...HEAVY RAINFALL EXPECTED TODAY ACROSS PORTIONS OF SOUTH TEXAS... .AN UPPER LEV... (length: 368)',
    updated: '2014-11-05T04:50:00-06:00',
    msgType: 'Alert',
    published: '2014-11-05T04:50:00-06:00',
    areaDesc: 'Bee; Goliad; La Salle; Live Oak; McMullen; Victoria; Webb',
    status: 'Actual',
    title: 'Flash Flood Watch issued November 05 at 4:50AM CST until November 05 at 6:00PM C... (length: 89)',
    certainty: 'Possible',
    url: 'http://alerts.weather.gov/cap/wwacapget.php?x=TX1251776A4868.FlashFloodWatch.125... (length: 134)',
    expires: '2014-11-05T18:00:00-06:00',
    geocode:
     { FIPS6: '048025 048175 048283 048297 048311 048469 048479',
       UGC: 'TXZ229 TXZ230 TXZ231 TXZ232 TXZ233 TXZ234 TXZ239' },
    severity: 'Severe',
    urgency: 'Expected',
    category: 'Met',
    polygon: '29.75,-101.76 29.82,-101.76 29.82,-101.46 29.62,-101.22 29.54,-101.28 29.73,-101... (length: 97)',
    effective: '2014-11-05T04:50:00-06:00',
    parameter: { VTEC: '/O.CON.KCRP.FF.A.0003.000000T0000Z-141106T0000Z/\n/00000.0.ER.000000T0000Z.000000... (length: 103)' }
  };

  var style = stylize.style(testAlert);

  var expected = {
    'fill': '#2E8B57'
  };

  t.plan(1);
  t.deepEqual(style, expected);
});
