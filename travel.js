const destinations = [
  [
    "United Kingdom",
    [
      [
        "London",
        51.507,
        -0.128
      ],
      [
        "Brighton",
        50.823,
        -0.137
      ],
      [
        "Bath",
        51.381,
        -2.36
      ],
      [
        "Bristol",
        51.455,
        -2.588
      ],
      [
        "Oxford",
        51.752,
        -1.258
      ],
      [
        "Cambridge",
        52.205,
        0.122
      ],
      [
        "Coventry",
        52.407,
        -1.519
      ],
      [
        "Birmingham",
        52.486,
        -1.89
      ],
      [
        "Leicester",
        52.636,
        -1.139
      ],
      [
        "Loughborough",
        52.772,
        -1.206
      ],
      [
        "Nottingham",
        52.954,
        -1.158
      ],
      [
        "Manchester",
        53.48,
        -2.242
      ],
      [
        "Liverpool",
        53.408,
        -2.991
      ],
      [
        "York",
        53.96,
        -1.082
      ],
      [
        "Saltburn-by-the-Sea",
        54.583,
        -0.973
      ],
      [
        "Scarborough",
        54.283,
        -0.399
      ],
      [
        "Whitby",
        54.486,
        -0.614
      ],
      [
        "Edinburgh",
        55.953,
        -3.189
      ],
      [
        "Glasgow",
        55.864,
        -4.252
      ],
      [
        "Scottish Highlands",
        57.12,
        -4.71
      ]
    ]
  ],
  [
    "France",
    [
      [
        "Paris",
        48.857,
        2.352
      ],
      [
        "Marseille",
        43.296,
        5.37
      ],
      [
        "Arles",
        43.677,
        4.63
      ]
    ]
  ],
  [
    "Spain",
    [
      [
        "Barcelona",
        41.387,
        2.17
      ],
      [
        "Salamanca",
        40.971,
        -5.664
      ],
      [
        "Seville",
        37.389,
        -5.984
      ],
      [
        "Málaga",
        36.721,
        -4.421
      ],
      [
        "Ronda",
        36.746,
        -5.161
      ]
    ]
  ],
  [
    "Portugal",
    [
      [
        "Porto",
        41.157,
        -8.629
      ],
      [
        "Aveiro",
        40.641,
        -8.654
      ],
      [
        "Lisbon",
        38.722,
        -9.139
      ],
      [
        "Faro",
        37.019,
        -7.93
      ]
    ]
  ],
  [
    "Germany",
    [
      [
        "Cologne",
        50.938,
        6.96
      ],
      [
        "Düsseldorf",
        51.228,
        6.773
      ],
      [
        "Duisburg",
        51.435,
        6.763
      ]
    ]
  ],
  [
    "Netherlands",
    [
      [
        "Amsterdam",
        52.368,
        4.904
      ]
    ]
  ],
  [
    "Singapore",
    [
      [
        "Singapore",
        1.352,
        103.82
      ]
    ]
  ],
  [
    "Malaysia",
    [
      [
        "Kuala Lumpur",
        3.139,
        101.687
      ],
      [
        "Semporna",
        4.481,
        118.612
      ]
    ]
  ],
  [
    "Macao",
    [
      [
        "Macao",
        22.198,
        113.544
      ]
    ]
  ]
];
const mapElement = document.getElementById("travel-map");
if (window.L && mapElement) {
  mapElement.hidden = false;
  const map = L.map(mapElement, { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  const markers = L.layerGroup().addTo(map);
  const selector = document.getElementById("travel-region");
  selector.closest(".travel-controls").hidden = false;
  const overview = [
    ["United Kingdom", "gb", 54, -2.5],
    ["France", "fr", 46.6, 2.4],
    ["Spain", "es", 40.1, -3.7],
    ["Portugal", "pt", 39.6, -8.3],
    ["Germany", "de", 51.2, 10.2],
    ["Netherlands", "nl", 53, 4.7],
    ["Singapore", "sg", 1.352, 103.82],
    ["Malaysia", "my", 5.2, 110],
    ["Macao", "mo", 22.198, 113.544]
  ];
  function showDestinations() {
    markers.clearLayers();
    const bounds = L.latLngBounds([]);
    if (!selector.value) {
      for (const [region, flag, lat, lon] of overview) {
        const icon = L.divIcon({
          className: "region-flag",
          html: '<img src="https://flagcdn.com/w80/' + flag + '.png" alt="">',
          iconSize: [30, 22],
          iconAnchor: [15, 11]
        });
        const marker = L.marker([lat, lon], { icon, title: region });
        marker.on("add", () => marker.getElement()?.setAttribute("aria-label", region));
        marker.addTo(markers);
        marker.bindTooltip(region).on("click", () => {
          selector.value = region;
          showDestinations();
        });
        bounds.extend([lat, lon]);
      }
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 });
      return;
    }
    for (const [region, places] of destinations) {
      if (selector.value && selector.value !== region) continue;
      for (const [name, lat, lon] of places) {
        const label = name === region ? name : name + " · " + region;
        L.marker([lat, lon], { title: label, alt: label }).bindPopup(label).addTo(markers);
        bounds.extend([lat, lon]);
      }
    }
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 9 });
  }
  selector.addEventListener("change", showDestinations);
  showDestinations();
}
