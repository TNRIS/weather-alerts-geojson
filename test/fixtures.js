'use strict';


var features = [
  {
    "id": "feature1",
    "type": "Feature",
    "properties": {
      "size": 5000
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -108.28125,
            38.20365531807149
          ],
          [
            -105.99609375,
            34.30714385628804
          ],
          [
            -101.77734374999999,
            37.23032838760387
          ],
          [
            -108.28125,
            38.20365531807149
          ]
        ]
      ]
    }
  }, {
    "type": "Feature",
    "id": "feature2",
    "properties": {
      "size": 200
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -98.4375,
            35.817813158696616
          ],
          [
            -97.6025390625,
            33.797408767572485
          ],
          [
            -94.1748046875,
            32.99023555965106
          ],
          [
            -90.7470703125,
            37.37015718405753
          ],
          [
            -94.9658203125,
            38.06539235133249
          ],
          [
            -98.4375,
            35.817813158696616
          ]
        ]
      ]
    }
  }, {
    "type": "Feature",
    "id": "feature3",
    "properties": {
      "size": 300
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -100.45898437499999,
            43.96119063892024
          ],
          [
            -89.2529296875,
            38.376115424036016
          ],
          [
            -94.9658203125,
            44.902577996288876
          ],
          [
            -97.03125,
            45.336701909968106
          ],
          [
            -100.45898437499999,
            43.96119063892024
          ]
        ]
      ]
    }
  }
];


module.exports = {
  features: features,
  featureCollection: {
    "type": "FeatureCollection",
    "features": features
  }
};
