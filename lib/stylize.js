'use strict';

// source: http://www.weather.gov/help-map
var colors = {
  '911 Telephone Outage': 'C0C0C0',
  'Administrative Message': 'FFFFFF',
  'Air Quality Alert': '808080',
  'Air Stagnation Advisory': '808080',
  'Arroyo and Small Stream Flood Advisory': '00FF7F',
  'Ashfall Advisory': '696969',
  'Ashfall Warning': 'A9A9A9',
  'Avalanche Advisory': 'CD853F',
  'Avalanche Warning': '1E90FF',
  'Avalanche Watch': 'F4A460',
  'Beach Hazards Statement': '40E0D0',
  'Blizzard Warning': 'FF4500',
  'Blizzard Watch': 'ADFF2F',
  'Blowing Dust Advisory': 'BDB76B',
  'Brisk Wind Advisory': 'D8BFD8',
  'Child Abduction Emergency': 'FFD700',
  'Civil Danger Warning': 'FFB6C1',
  'Civil Emergency Message': 'FFB6C1',
  'Coastal Flood Advisory': '7CFC00',
  'Coastal Flood Statement': '6B8E23',
  'Coastal Flood Warning': '228B22',
  'Coastal Flood Watch': '66CDAA',
  'Dense Fog Advisory': '708090',
  'Dense Smoke Advisory': 'F0E68C',
  'Dust Storm Warning': 'FFE4C4',
  'Earthquake Warning': '8B4513',
  'Evacuation - Immediate': '7FFF00',
  'Excessive Heat Warning': 'C71585',
  'Excessive Heat Watch': '800000',
  'Extreme Cold Warning': '0000FF',
  'Extreme Cold Watch': '0000FF',
  'Extreme Fire Danger': 'E9967A',
  'Extreme Wind Warning': 'FF8C00',
  'Fire Warning': 'A0522D',
  'Fire Weather Watch': 'FFDEAD',
  'Flash Flood Statement': '8B0000',
  'Flash Flood Warning': '8B0000',
  'Flash Flood Watch': '2E8B57',
  'Flood Advisory': '00FF7F',
  'Flood Statement': '00FF00',
  'Flood Warning': '00FF00',
  'Flood Watch': '2E8B57',
  'Freeze Warning': '483D8B',
  'Freeze Watch': '00FFFF',
  'Freezing Fog Advisory': '008080',
  'Freezing Rain Advisory': 'DA70D6',
  'Freezing Spray Advisory': '00BFFF',
  'Frost Advisory': '6495ED',
  'Gale Warning': 'DDA0DD',
  'Gale Watch': 'FFC0CB',
  'Hard Freeze Warning': '9400D3',
  'Hard Freeze Watch': '4169E1',
  'Hazardous Materials Warning': '4B0082',
  'Hazardous Seas Warning': 'D8BFD8',
  'Hazardous Seas Watch': '483D8B',
  'Hazardous Weather Outlook': 'EEE8AA',
  'Heat Advisory': 'FF7F50',
  'Heavy Freezing Spray Warning': '00BFFF',
  'Heavy Freezing Spray Watch': 'BC8F8F',
  'High Surf Advisory': 'BA55D3',
  'High Surf Warning': '228B22',
  'High Wind Warning': 'DAA520',
  'High Wind Watch': 'B8860B',
  'Hurricane Force Wind Warning': 'CD5C5C',
  'Hurricane Force Wind Watch': '9932CC',
  'Hurricane Local Statement': 'FFE4B5',
  'Hurricane Warning': 'DC143C',
  'Hurricane Watch': 'FF00FF',
  'Hydrologic Advisory': '00FF7F',
  'Hydrologic Outlook': '90EE90',
  'Ice Storm Warning': '8B008B',
  'Lake Effect Snow Advisory': '48D1CC',
  'Lake Effect Snow Warning': '008B8B',
  'Lake Effect Snow Watch': '87CEFA',
  'Lake Wind Advisory': 'D2B48C',
  'Lakeshore Flood Advisory': '7CFC00',
  'Lakeshore Flood Statement': '6B8E23',
  'Lakeshore Flood Warning': '228B22',
  'Lakeshore Flood Watch': '66CDAA',
  'Law Enforcement Warning': 'C0C0C0',
  'Local Area Emergency': 'C0C0C0',
  'Low Water Advisory': 'A52A2A',
  'Marine Weather Statement': 'FFDAB9',
  'Nuclear Power Plant Warning': '4B0082',
  'Radiological Hazard Warning': '4B0082',
  'Red Flag Warning': 'FF1493',
  'Rip Current Statement': '40E0D0',
  'Severe Thunderstorm Warning': 'FFA500',
  'Severe Thunderstorm Watch': 'DB7093',
  'Severe Weather Statement': '00FFFF',
  'Shelter In Place Warning': 'FA8072',
  'Short Term Forecast': '98FB98',
  'Small Craft Advisory': 'D8BFD8',
  'Small Craft Advisory For Hazardous Seas': 'D8BFD8',
  'Small Craft Advisory For Rough Bar': 'D8BFD8',
  'Small Craft Advisory For Winds': 'D8BFD8',
  'Small Stream Flood Advisory': '00FF7F',
  'Special Marine Warning': 'FFA500',
  'Special Weather Statement': 'FFE4B5',
  'Storm Warning': '9400D3',
  'Storm Watch': 'FFE4B5',
  'Test': 'F0FFFF',
  'Tornado Warning': 'FF0000',
  'Tornado Watch': 'FFFF00',
  'Tropical Depression Local Statement': 'FFE4B5',
  'Tropical Storm Local Statement': 'FFE4B5',
  'Tropical Storm Warning': 'B22222',
  'Tropical Storm Watch': 'F08080',
  'Tsunami Advisory': 'D2691E',
  'Tsunami Warning': 'FD6347',
  'Tsunami Watch': 'FF00FF',
  'Typhoon Local Statement': 'FFE4B5',
  'Typhoon Warning': 'DC143C',
  'Typhoon Watch': 'FF00FF',
  'Urban and Small Stream Flood Advisory': '00FF7F',
  'Volcano Warning': '2F4F4F',
  'Wind Advisory': 'D2B48C',
  'Wind Chill Advisory': 'AFEEEE',
  'Wind Chill Warning': 'B0C4DE',
  'Wind Chill Watch': '5F9EA0',
  'Winter Storm Warning': 'FF69B4',
  'Winter Storm Watch': '4682B4',
  'Winter Weather Advisory': '7B68EE'
};

function style (alert) {
  var baseColor = '#' + colors[alert.event];

  return {
    'fill': baseColor
  };
}

module.exports = {
  style: style
};