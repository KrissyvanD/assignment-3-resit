const api = {
key: "acdd0e3fbba77ba724190f904b36165a", 
base: "https://api.openweathermap.org/data/2.5/"
}

mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3N5dmFuZCIsImEiOiJja2Jxb3k3dHMyb2doMnJsOTUxNWw1cXMzIn0.j8ZqrOu1apV44ewk8V67bg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8],
  zoom: 3
});

// code from the next step will go here!
var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-77.032, 38.913]
    },
    properties: {
      title: 'Mapbox',
      description: 'Washington, D.C.'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.414, 37.776]
    },
    properties: {
      title: 'Mapbox',
      description: 'San Francisco, California',
      }
    },
	{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-115.139, 36.169]
    },
    properties: {
      title: 'Mapbox',
      description: 'Las Vegas, Nevada '
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-87.623, 41.881]
    },
    properties: {
      title: 'Mapbox',
      description: 'Chicago, Illinois '
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-73.935, 40.730]
    },
    properties: {
      title: 'Mapbox',
      description: 'New York, New York '
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-95.358, 29.749]
    },
    properties: {
      title: 'Mapbox',
      description: 'Houston, Texas '
    }
  },
  ]
};

// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map

function callback(weather){
	 mapMarker = new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    	.setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>' + `${Math.round(weather.main.temp)}<span>°C</span>`)
    	)
    .addTo(map);
}
getResults(marker.geometry.coordinates[0], marker.geometry.coordinates[1],callback);

});

function getResults(lon,lat, callback){
	fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
	.then(weather => {return weather.json()})
	.then(callback)
		}




